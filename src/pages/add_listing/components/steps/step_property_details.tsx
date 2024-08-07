import { useState } from "react";
import { styled } from "@mui/material/styles";

import { AdvertType, DescriptionType } from "../../../../utils/enums";

import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import HouseIcon from "@mui/icons-material/House";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ListSubheader, { ListSubheaderProps } from "@mui/material/ListSubheader";
import InputField from "../../../../components/form/InputField";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Editor from "../../../../components/form/Editor";

const OptionCategory = styled(ListSubheader)<ListSubheaderProps>(() => ({
  color: "#000000",
  fontSize: "18px",
}));

const StyledStepPropertyDetails = styled("div")(({ theme }) => {
  return `
    .advert-type {
      svg {
        display: none;
      }
      p {
        margin-left: 0;
      }
    }
    .custom-description {
      p {
        margin: 0;
      }
      a {
        color: ${theme.palette.primary.dark};
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
      }
    }
    @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
      .advert-type {
        svg {
          display: block;
        }
        p {
          margin-left: 10px;
        }
      }
    }
  `;
});

export interface PropertyDetailsPayload {
  advertType: AdvertType;
  propertyType: string;
  bedroomsNumber: number;
  bathroomsNumber: number;
  furnishing: string;
  billsIncluded: boolean;
  gardenAccess: boolean;
  parking: boolean;
  fireplace: boolean;
  descriptionType: DescriptionType;
  description: string;
}

interface StepPropertyDetailsProps {
  advertType: AdvertType;
  propertyType: string;
  bedroomsNumber: number;
  bathroomsNumber: number;
  furnishing: string;
  billsIncluded: boolean;
  gardenAccess: boolean;
  parking: boolean;
  fireplace: boolean;
  descriptionType: DescriptionType;
  description: string;
  backCallback: () => void;
  nextCallback: (payload: PropertyDetailsPayload) => void;
}

const StepPropertyDetails: React.FC<StepPropertyDetailsProps> = ({
  advertType = AdvertType.WHOLE,
  propertyType,
  bedroomsNumber,
  bathroomsNumber,
  furnishing,
  billsIncluded,
  gardenAccess,
  parking,
  fireplace,
  descriptionType,
  description,
  backCallback,
  nextCallback,
}) => {
  const [formValueAdvertType, setFormValueAdvertType] = useState(advertType);
  const [formValuePropertyType, setFormValuePropertyType] =
    useState(propertyType);
  const [formValueBedroomsNumber, setFormValueBedroomsNumber] =
    useState(bedroomsNumber);
  const [formValueBathroomsNumber, setFormValueBathroomsNumber] =
    useState(bathroomsNumber);
  const [formValueFurnishing, setFormValueFurnishing] = useState(furnishing);
  const [formValueBillsIncluded, setFormValueBillsIncluded] =
    useState(billsIncluded);
  const [formValueGardenAccess, setFormValueGardenAccess] =
    useState(gardenAccess);
  const [formValueParking, setFormValueParking] = useState(parking);
  const [formValueFireplace, setFormValueFireplace] = useState(fireplace);
  const [formValueDescriptionType, setFormValueDescriptionType] =
    useState(descriptionType);
  const [formValueDescription, setFormValueDescription] = useState(description);

  const handleSubmitStep = () => {
    nextCallback({
      advertType: formValueAdvertType,
      propertyType: formValuePropertyType,
      bedroomsNumber: formValueBedroomsNumber,
      bathroomsNumber: formValueBathroomsNumber,
      furnishing: formValueFurnishing,
      billsIncluded: formValueBillsIncluded,
      gardenAccess: formValueGardenAccess,
      parking: formValueParking,
      fireplace: formValueFireplace,
      descriptionType: formValueDescriptionType,
      description: formValueDescription,
    });
  };

  const handleClickBack = () => {
    backCallback();
  };

  const handleChangeAdvertType = (
    _: React.MouseEvent<HTMLElement>,
    newAdvertType: AdvertType
  ) => {
    setFormValueAdvertType(newAdvertType);
    setFormValuePropertyType("");
  };

  const handleChangePropertyType = (e: SelectChangeEvent<string>) => {
    setFormValuePropertyType(e.target.value);
  };

  const handleChangeBedroomsNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValueBedroomsNumber(Number(e.target.value));
  };

  const handleChangeBathroomsNumber = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValueBathroomsNumber(Number(e.target.value));
  };

  const handleChangeFurnishing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValueFurnishing(e.target.value);
  };

  const handleChangeBillsIncluded = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValueBillsIncluded(event.target.checked);
  };

  const handleChangeGardenAccess = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValueGardenAccess(event.target.checked);
  };

  const handleChangeParking = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValueParking(event.target.checked);
  };

  const handleChangeFireplace = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValueFireplace(event.target.checked);
  };

  const handleChangeDescriptionType = (
    _: React.MouseEvent<HTMLElement>,
    newDescriptionType: DescriptionType
  ) => {
    setFormValueDescriptionType(newDescriptionType);
  };

  const handleChangeDescription = (v: string) => {
    setFormValueDescription(v);
  };

  const renderPropertyTypeSelect = () => {
    const propertyTypeProps = {
      value: formValuePropertyType,
      id: "property-type",
      label: "Property Type",
      onChange: handleChangePropertyType,
    };
    if (formValueAdvertType === AdvertType.ROOM) {
      return (
        <Select {...propertyTypeProps}>
          <MenuItem value="shared-house">Room in a shared house</MenuItem>
          <MenuItem value="shared-flat">Room in a shared flat</MenuItem>
        </Select>
      );
    }
    return (
      <Select {...propertyTypeProps}>
        <OptionCategory>Single occupancy</OptionCategory>
        <MenuItem value="studio-flat">Studio flat</MenuItem>
        <MenuItem value="bedsit">Bedsit</MenuItem>
        <OptionCategory>Entire house</OptionCategory>
        <MenuItem value="detached-house">Detached house</MenuItem>
        <MenuItem value="semi-detached-house">Semi-detached house</MenuItem>
        <MenuItem value="terraced-house">Terraced house</MenuItem>
        <MenuItem value="bungalow">Bungalow</MenuItem>
        <MenuItem value="end-terrace">End terrace</MenuItem>
        <OptionCategory>Entire flat</OptionCategory>
        <MenuItem value="flat">Flat</MenuItem>
        <MenuItem value="penthouse">Penthouse</MenuItem>
        <MenuItem value="maisonette">Maisonette</MenuItem>
        <OptionCategory>Other property types</OptionCategory>
        <MenuItem value="mobile-home">Mobile home</MenuItem>
        <MenuItem value="house-boat">House boat</MenuItem>
      </Select>
    );
  };

  const renderCustomDescription = () => {
    if (formValueDescriptionType === DescriptionType.AI) {
      return (
        <div className="custom-description">
          <p>
            We will collate all the property information you have entered and
            automatically generate a description. You can preview this using the
            Preview button below.
          </p>
        </div>
      );
    }
    return (
      <>
        <div className="custom-description">
          <p>
            To find out how to get the most out of your description visit our
            help centre{" "}
            <a
              href="https://www.openrent.co.uk/kb/articles/360019863612-what-kind-of-description-should-i-use-"
              target="blank"
            >
              here
            </a>{" "}
            to see our guidelines and an example.
          </p>
        </div>
        <Editor
          value={formValueDescription}
          onChange={handleChangeDescription}
        />
      </>
    );
  };

  return (
    <StyledStepPropertyDetails>
      <StepContainer>
        <Stack spacing={3}>
          <ToggleButtonGroup
            color="primary"
            value={formValueAdvertType}
            exclusive
            onChange={handleChangeAdvertType}
            aria-label="Advert type"
            fullWidth={true}
          >
            <ToggleButton value={AdvertType.WHOLE}>
              <div className="advert-type">
                <Stack spacing={2} direction="row">
                  <HouseIcon />
                  <Typography variant="body1" paragraph={true}>
                    Whole Property
                  </Typography>
                </Stack>
              </div>
            </ToggleButton>
            <ToggleButton value={AdvertType.ROOM}>
              <div className="advert-type">
                <Stack spacing={2} direction="row">
                  <div className="advert-type-icon">
                    <SingleBedIcon />
                  </div>
                  <Typography variant="body1" paragraph={true}>
                    Single room
                  </Typography>
                </Stack>
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
          <FormControl>
            <InputLabel htmlFor="grouped-select">Property Type</InputLabel>
            {renderPropertyTypeSelect()}
          </FormControl>
          <InputField
            id="bedrooms-number"
            label="Number of bedrooms"
            onChange={handleChangeBedroomsNumber}
            value={String(formValueBedroomsNumber)}
            inputType="number"
            tooltip={
              formValueAdvertType === AdvertType.ROOM ? (
                <p>
                  For a shared property, enter the total number of bedrooms in
                  the property.
                </p>
              ) : undefined
            }
          />
          <InputField
            id="bathrooms-number"
            label="Number of bathrooms"
            onChange={handleChangeBathroomsNumber}
            value={String(formValueBathroomsNumber)}
            inputType="number"
            tooltip={
              formValueAdvertType === AdvertType.ROOM ? (
                <p>
                  For a shared property, enter the total number of bathrooms in
                  the property.
                </p>
              ) : undefined
            }
          />
          <TextField
            select
            value={formValueFurnishing}
            id="furnishing"
            label="Furnishing options"
            onChange={handleChangeFurnishing}
          >
            <MenuItem value="furnished">Furnished</MenuItem>
            <MenuItem value="unfurnished">Unfurnished</MenuItem>
            <MenuItem value="tenant">Furnishing at tenant choice</MenuItem>
          </TextField>
          <Grid container spacing={3}>
            <Grid item={true} xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValueBillsIncluded}
                      onChange={handleChangeBillsIncluded}
                      color="success"
                    />
                  }
                  label="Bills included"
                />
              </FormGroup>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValueGardenAccess}
                      onChange={handleChangeGardenAccess}
                      color="success"
                    />
                  }
                  label="Garden Access"
                />
              </FormGroup>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValueParking}
                      onChange={handleChangeParking}
                      color="success"
                    />
                  }
                  label="Parking"
                />
              </FormGroup>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formValueFireplace}
                      onChange={handleChangeFireplace}
                      color="success"
                    />
                  }
                  label="Fireplace"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="h6">Property description</Typography>
          <ToggleButtonGroup
            color="primary"
            value={formValueDescriptionType}
            exclusive
            onChange={handleChangeDescriptionType}
            aria-label="Description type"
            fullWidth={true}
          >
            <ToggleButton value={DescriptionType.AI}>
              <Stack spacing={2} direction="row">
                <Typography variant="body1" paragraph={true}>
                  AI generated description
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value={DescriptionType.CUSTOM}>
              <Stack spacing={2} direction="row">
                <Typography variant="body1" paragraph={true}>
                  Custom description
                </Typography>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
          {renderCustomDescription()}
        </Stack>
      </StepContainer>
      <NavBottom
        backCallback={handleClickBack}
        nextCallback={handleSubmitStep}
      />
    </StyledStepPropertyDetails>
  );
};

export default StepPropertyDetails;
