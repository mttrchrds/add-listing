import { useState } from "react";
import { styled } from "@mui/material/styles";
import _find from "lodash/find";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";
import GoogleMapsPlacesAutocomplete, {
  PlaceDetailsPayload,
} from "../../../../components/maps/GoogleMapsPlacesAutocomplete";
import InputField from "../../../../components/form/InputField";
import StreetViewPanorama from "../../../../components/maps/StreetViewPanorama";

import markerImg from "/marker@2x.png";
import streetViewImg from "/street_view_32.png";

const StyledStepLocation = styled("div")(() => {
  return `
    .streetview-intro {
      margin-top: 30px;
      line-height: 1.5;
      img {
        vertical-align: middle; 
      }
    }
  `;
});

export interface LocationPayload {
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  lat: number;
  lng: number;
}
interface StepLocationProps {
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  lat: number;
  lng: number;
  backCallback: () => void;
  nextCallback: (payload: LocationPayload) => void;
}

const StepLocation: React.FC<StepLocationProps> = ({
  address1,
  address2,
  address3,
  postCode,
  lat,
  lng,
  backCallback,
  nextCallback,
}) => {
  const [formValueAddress1, setFormValueAddress1] = useState(address1);
  const [formErrorAddress1, setFormErrorAddress1] = useState("");
  const [formValueAddress2, setFormValueAddress2] = useState(address2);
  const [formValueAddress3, setFormValueAddress3] = useState(address3);
  const [formErrorAddress3, setFormErrorAddress3] = useState("");
  const [formValuePostCode, setFormValuePostCode] = useState(postCode);
  const [formErrorPostCode, setFormErrorPostCode] = useState("");
  const [formValueLat, setFormValueLat] = useState(lat);
  const [formValueLng, setFormValueLng] = useState(lng);
  const [formErrorLatLng, setFormErrorLatLng] = useState(false);

  const handleGoogleMapsPlacesAutoCompleteCallback = (
    payload: PlaceDetailsPayload
  ) => {
    const acHouseNumber = _find(payload.addressComponents, (ac) =>
      ac.types.includes("street_number")
    );
    let houseNumber = "";
    if (acHouseNumber) {
      houseNumber = acHouseNumber.longText;
    }
    const acRoute = _find(payload.addressComponents, (ac) =>
      ac.types.includes("route")
    );
    let route = "";
    if (acRoute) {
      route = acRoute.longText;
    }
    const acTown = _find(payload.addressComponents, (ac) =>
      ac.types.includes("postal_town")
    );
    let town = "";
    if (acTown) {
      town = acTown.longText;
    }
    const acPostCode = _find(payload.addressComponents, (ac) =>
      ac.types.includes("postal_code")
    );
    let postCode = "";
    if (acPostCode) {
      postCode = acPostCode.longText;
    }
    const lat = payload.location.latitude;
    const lng = payload.location.longitude;
    if (lat && lng) {
      setFormErrorLatLng(false);
    }
    if (houseNumber || route) {
      setFormValueAddress1(`${houseNumber} ${route}`);
    }
    if (town) {
      setFormValueAddress3(town);
    }
    if (postCode) {
      setFormValuePostCode(postCode);
    }
    if (lat) {
      setFormValueLat(lat);
    }
    if (lng) {
      setFormValueLng(lng);
    }
  };

  const handleChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setFormErrorAddress1("");
    }
    setFormValueAddress1(e.target.value);
  };

  const handleChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValueAddress2(e.target.value);
  };

  const handleChangeAddress3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setFormErrorAddress3("");
    }
    setFormValueAddress3(e.target.value);
  };

  const handleChangePostCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setFormErrorPostCode("");
    }
    setFormValuePostCode(e.target.value);
  };

  const handleSubmitStep = () => {
    if (!formValueLat || !formValueLng) {
      setFormErrorLatLng(true);
    } else if (!formValueAddress1) {
      setFormErrorAddress1("Flat our House Number is required");
    } else if (!formValueAddress3) {
      setFormErrorAddress3("A town is required");
    } else if (!formValuePostCode) {
      setFormErrorPostCode("Post code is required");
    } else {
      nextCallback({
        address1: formValueAddress1,
        address2: formValueAddress2,
        address3: formValueAddress3,
        postCode: formValuePostCode,
        lat: formValueLat,
        lng: formValueLng,
      });
    }
  };

  const handleClickBack = () => {
    backCallback();
  };

  const renderFields = () => {
    if (formValueLat && formValueLng) {
      return (
        <>
          <InputField
            id="address1"
            label="Flat or House Number (kept private)"
            tooltip={
              <>
                <p>
                  Please enter the <b>full</b> first line of your address
                  including house number. We won't publish the property number
                  itself.
                </p>
                <p>
                  For example <b>you enter</b>: "12 Imaginary Lane" Will appear
                  to tenants as: "Imaginary Lane"
                </p>
                <p>
                  <b>
                    If this is a flat, please enter Flat 12, or 345 Nelson
                    Mandela House for example. This will all be kept private.
                  </b>
                </p>
              </>
            }
            onChange={handleChangeAddress1}
            value={formValueAddress1}
            error={formErrorAddress1}
          />
          <InputField
            id="address2"
            label="Address line 2 (optional)"
            onChange={handleChangeAddress2}
            value={formValueAddress2}
          />
          <InputField
            id="address3"
            label="Town"
            onChange={handleChangeAddress3}
            value={formValueAddress3}
            error={formErrorAddress3}
          />
          <InputField
            id="postCode"
            label="Post code"
            onChange={handleChangePostCode}
            value={formValuePostCode}
            error={formErrorPostCode}
          />
          <p className="streetview-intro">
            Please place the{" "}
            <img src={markerImg} alt="" width="24" height="32" /> marker where
            your property is located, and position the Street View{" "}
            <img src={streetViewImg} alt="" /> marker and camera to look at the
            property (if Street View is available at your location).
          </p>
          <StreetViewPanorama lat={formValueLat} lng={formValueLng} />
        </>
      );
    }
    return null;
  };

  const renderLatLngError = () => {
    if (formErrorLatLng) {
      return (
        <Alert severity="error">
          Please search and select your property location
        </Alert>
      );
    }
    return null;
  };

  return (
    <StyledStepLocation>
      <StepContainer>
        <Stack spacing={3}>
          {renderLatLngError()}
          <GoogleMapsPlacesAutocomplete
            selectedCallback={handleGoogleMapsPlacesAutoCompleteCallback}
          />
          {renderFields()}
        </Stack>
      </StepContainer>
      <NavBottom
        firstStep={true}
        backCallback={handleClickBack}
        nextCallback={handleSubmitStep}
      />
    </StyledStepLocation>
  );
};

export default StepLocation;
