import { useState, useMemo, useRef } from "react";
import { debounce } from "@mui/material/utils";
import _get from "lodash/get";
import { v4 as uuidv4 } from "uuid";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";

interface AutocompleteMatch {
  startOffset?: number;
  endOffset: number;
}

interface AutocompleteStructuredFormatMainText {
  matches: AutocompleteMatch[];
  text: string;
}

interface AutocompleteStructuredFormatSecondaryText {
  text: string;
}

interface AutocompleteStructuredFormat {
  mainText: AutocompleteStructuredFormatMainText;
  secondaryText: AutocompleteStructuredFormatSecondaryText;
}

interface AutocompleteText {
  text: string;
}

interface AutocompletePrediction {
  placeId: string;
  structuredFormat: AutocompleteStructuredFormat;
  text: AutocompleteText;
}

interface AutocompletePredictionOuter {
  placePrediction: AutocompletePrediction;
}

interface AutocompletePayload {
  suggestions: AutocompletePredictionOuter[];
}

interface PlaceDetailsAddressComponents {
  longText: string;
  types: string[];
}

interface PlaceDetailsLocation {
  latitude: number;
  longitude: number;
}

export interface PlaceDetailsPayload {
  addressComponents: PlaceDetailsAddressComponents[];
  location: PlaceDetailsLocation;
}

interface GoogleMapsPlacesAutocompleteProps {
  selectedCallback: (payload: PlaceDetailsPayload) => void;
}

const GoogleMapsPlacesAutocomplete: React.FC<
  GoogleMapsPlacesAutocompleteProps
> = ({ selectedCallback }) => {
  const [value, setValue] = useState<AutocompletePredictionOuter>({
    placePrediction: {
      placeId: "",
      structuredFormat: {
        mainText: {
          matches: [],
          text: "",
        },
        secondaryText: {
          text: "",
        },
      },
      text: {
        text: "",
      },
    },
  });
  const [options, setOptions] = useState<AutocompletePredictionOuter[] | []>(
    []
  );
  const sessionToken = useRef(uuidv4());

  const fetchHeaders = useMemo(() => {
    return {
      "content-type": "application/json",
      "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_API_KEY,
    };
  }, []);

  const fetchGoogleAPI = async (
    url: string,
    requestOptions: RequestInit,
    callback: (payload: PlaceDetailsPayload) => void
  ) => {
    const response = await fetch(url, requestOptions);

    const parsedResponse = await response.json();

    if (parsedResponse.error) {
      throw new Error(parsedResponse.error);
    } else {
      return callback(parsedResponse);
    }
  };

  const debouncedFetchPlaces = useMemo(
    () =>
      debounce((input, callback) => {
        fetchGoogleAPI(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            headers: fetchHeaders,
            method: "POST",
            body: JSON.stringify(input),
          },
          callback
        );
      }, 400),
    [fetchHeaders]
  );

  const handleSelectOption = (newVal: AutocompletePredictionOuter | null) => {
    if (newVal) {
      setValue(newVal);
      const placeId = _get(newVal, ["placePrediction", "placeId"]);

      if (placeId) {
        fetchGoogleAPI(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            headers: {
              ...fetchHeaders,
              "X-Goog-FieldMask": "addressComponents,location",
            },
            method: "GET",
          },
          (payload) => {
            if (payload) {
              selectedCallback(payload);
            }
          }
        );
      }

      // Reset session token
      sessionToken.current = uuidv4();
    }
  };

  const handleChangeInput = (newInputVal: string, reason: string) => {
    if (reason === "input" && newInputVal) {
      debouncedFetchPlaces(
        {
          input: newInputVal,
          includedRegionCodes: ["gb"],
          sessionToken: sessionToken.current,
        },
        (payload: AutocompletePayload) => {
          let newOptions: AutocompletePredictionOuter[] = [];

          if (value) {
            newOptions = [value];
          }

          if (payload.suggestions) {
            newOptions = [...newOptions, ...payload.suggestions];
          }

          setOptions(newOptions);
        }
      );
    }
  };

  return (
    <Autocomplete
      id="google-maps-places-autocomplete"
      autoComplete
      getOptionLabel={(option) => {
        return typeof option === "string"
          ? option
          : _get(option, ["placePrediction", "text", "text"]);
      }}
      options={options}
      filterOptions={(x) => x}
      filterSelectedOptions
      value={value}
      includeInputInList
      onChange={(_, newValue) => {
        handleSelectOption(newValue);
      }}
      onInputChange={(_, newInputValue: string, reason) => {
        handleChangeInput(newInputValue, reason);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for your location" fullWidth />
      )}
      noOptionsText="No locations"
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.placePrediction.structuredFormat.mainText.matches || [];
        const parts = parse(
          option.placePrediction.structuredFormat.mainText.text,
          matches.map((match) => [match.startOffset || 0, match.endOffset])
        );
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.placePrediction.structuredFormat.secondaryText.text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default GoogleMapsPlacesAutocomplete;
