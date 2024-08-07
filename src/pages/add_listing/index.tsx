import { useState } from "react";

import { AdvertType, DescriptionType } from "../../utils/enums";

import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import NavTop from "./components/navigation/nav_top";
import StepLocation, {
  LocationPayload,
} from "./components/steps/step_location";
import StepPropertyDetails, {
  PropertyDetailsPayload,
} from "./components/steps/step_property_details";
import StepTenancyDetails from "./components/steps/step_tenancy_details";

const StyledAddListing = styled("div")(({ theme }) => {
  return `
    padding-bottom: 30px;
    .stepper-container {
      margin: 20px 0;
    }
    @media screen and (min-width: ${theme.breakpoints.values.md}px) {
      .stepper-container {
        margin: 40px 0;
      }
    }
  `;
});

const AddListing: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [postCode, setPostCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  // const [address1, setAddress1] = useState("136c Stroud Green Road");
  // const [address2, setAddress2] = useState("");
  // const [address3, setAddress3] = useState("London");
  // const [postCode, setPostCode] = useState("N4 3RZ");
  // const [lat, setLat] = useState(51.5693653);
  // const [lng, setLng] = useState(-0.1118666);

  const [advertType, setAdvertType] = useState(AdvertType.WHOLE);
  const [propertyType, setPropertyType] = useState("");
  const [bedroomsNumber, setBedroomsNumber] = useState(0);
  const [bathroomsNumber, setBathroomsNumber] = useState(0);
  const [furnishing, setFurnishing] = useState("");
  const [billsIncluded, setBillsIncluded] = useState(false);
  const [gardenAccess, setGardenAccess] = useState(false);
  const [parking, setParking] = useState(false);
  const [fireplace, setFireplace] = useState(false);
  const [descriptionType, setDescriptionType] = useState(DescriptionType.AI);
  const [description, setDescription] = useState("");

  const steps = [
    "Property location",
    "Property details",
    "Tenancy details",
    "Tenant preferences",
    "Viewings",
    "Media",
    "Publish",
  ];

  const handleBackStep = () => {
    setActiveStep((as) => as - 1);
  };

  const handleSubmitLocation = (payload: LocationPayload) => {
    setAddress1(payload.address1);
    setAddress2(payload.address2);
    setAddress3(payload.address3);
    setPostCode(payload.postCode);
    setLat(payload.lat);
    setLng(payload.lng);
    setActiveStep((a) => a + 1);
  };

  const handleSubmitPropertyDetails = (payload: PropertyDetailsPayload) => {
    setAdvertType(payload.advertType);
    setPropertyType(payload.propertyType);
    setBedroomsNumber(payload.bedroomsNumber);
    setBathroomsNumber(payload.bathroomsNumber);
    setFurnishing(payload.furnishing);
    setBillsIncluded(payload.billsIncluded);
    setGardenAccess(payload.gardenAccess);
    setParking(payload.parking);
    setFireplace(payload.fireplace);
    setDescriptionType(payload.descriptionType);
    setDescription(payload.description);
    setActiveStep((a) => a + 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepLocation
            address1={address1}
            address2={address2}
            address3={address3}
            postCode={postCode}
            lat={lat}
            lng={lng}
            backCallback={handleBackStep}
            nextCallback={handleSubmitLocation}
          />
        );
      case 1:
        return (
          <StepPropertyDetails
            advertType={advertType}
            propertyType={propertyType}
            bedroomsNumber={bedroomsNumber}
            bathroomsNumber={bathroomsNumber}
            furnishing={furnishing}
            billsIncluded={billsIncluded}
            gardenAccess={gardenAccess}
            parking={parking}
            fireplace={fireplace}
            descriptionType={descriptionType}
            description={description}
            backCallback={handleBackStep}
            nextCallback={handleSubmitPropertyDetails}
          />
        );
      case 2:
        return (
          <StepTenancyDetails
            backCallback={handleBackStep}
            address1={address1}
            address2={address2}
            address3={address3}
            postCode={postCode}
            lat={lat}
            lng={lng}
            advertType={advertType}
            propertyType={propertyType}
            bedroomsNumber={bedroomsNumber}
            bathroomsNumber={bathroomsNumber}
            furnishing={furnishing}
            billsIncluded={billsIncluded}
            gardenAccess={gardenAccess}
            parking={parking}
            fireplace={fireplace}
            descriptionType={descriptionType}
            description={description}
          />
        );
      default:
        return (
          <StepLocation
            address1={address1}
            address2={address2}
            address3={address3}
            postCode={postCode}
            lat={lat}
            lng={lng}
            backCallback={handleBackStep}
            nextCallback={handleSubmitLocation}
          />
        );
    }
  };

  return (
    <StyledAddListing>
      <NavTop />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <div className="stepper-container">
              <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {steps.map((s) => (
                  <Step key={s}>
                    <StepLabel>{s}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </Grid>
          <Grid xs={12}>{renderStep()}</Grid>
        </Grid>
      </Container>
    </StyledAddListing>
  );
};

export default AddListing;
