import { useState } from "react";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import NavTop from "./components/navigation/nav_top";
import StepLocation from "./components/steps/step_location";

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

  const handleViewedStep = (stepIndex: number) => {
    console.log("VIEWED STEP", stepIndex);
  };

  const renderStep = () => {
    return <StepLocation stepIndex={0} viewedCallback={handleViewedStep} />;
  };

  return (
    <StyledAddListing>
      <NavTop />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <div className="stepper-container">
              <Stepper nonLinear alternativeLabel>
                {steps.map((s) => (
                  <Step key={s}>
                    <StepLabel>{s}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </Grid>
          <Grid xs={12}>
            <Paper>
              <Grid container xs={12} spacing={2}>
                <Grid xs>&nbsp;</Grid>
                <Grid xs={8}>
                  <section className="stepper-content">{renderStep()}</section>
                </Grid>
                <Grid xs>&nbsp;</Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </StyledAddListing>
  );
};

export default AddListing;
