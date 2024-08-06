import { useState } from "react";

import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import NavTop from "./components/navigation/nav_top";
import StepLocation from "./components/steps/step_location";
import StepPropertyDetails from "./components/steps/step_property_details";
import StepTenancyDetails from "./components/steps/step_tenancy_details";

const StyledAddListing = styled("div")(({ theme }) => {
  return `
    .stepper-container {
      margin: 20px 0;
    }
    .stepper-content {
      padding: 20px 0;
    }
    @media screen and (min-width: ${theme.breakpoints.values.md}px) {
      .stepper-container {
        margin: 40px 0;
      }
      .stepper-content {
        padding: 40px 0;
      }
    }
  `;
});

const AddListing: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Property location",
    "Property details",
    "Tenancy details",
    "Tenant preferences",
    "Viewings",
    "Media",
    "Publish",
  ];

  console.log({ activeStep });

  const handleBackStep = () => {
    console.log("clicking back");
    setActiveStep((as) => as - 1);
  };

  const handleSubmitLocation = (payload: unknown) => {
    console.log("Submitting location", payload);
    setActiveStep((a) => a + 1);
  };

  const handleSubmitPropertyDetails = (payload: unknown) => {
    console.log("Submitting property details", payload);
    setActiveStep((a) => a + 1);
  };

  const handleSubmitTenancyDetails = (payload: unknown) => {
    console.log("Submitting tenancy details", payload);
    // setActiveStep((a) => a + 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepLocation
            backCallback={handleBackStep}
            nextCallback={handleSubmitLocation}
          />
        );
      case 1:
        return (
          <StepPropertyDetails
            backCallback={handleBackStep}
            nextCallback={handleSubmitPropertyDetails}
          />
        );
      case 2:
        return (
          <StepTenancyDetails
            backCallback={handleBackStep}
            nextCallback={handleSubmitTenancyDetails}
          />
        );
      default:
        return (
          <StepLocation
            backCallback={handleBackStep}
            nextCallback={handleSubmitLocation}
          />
        );
    }
    return (
      <StepLocation
        backCallback={handleBackStep}
        nextCallback={handleSubmitLocation}
      />
    );
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
