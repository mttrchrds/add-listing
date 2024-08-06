import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

const StyledStepContainer = styled("section")(({ theme }) => {
  return `
    .step-container {
      padding: 20px 0;
    }
    @media screen and (min-width: ${theme.breakpoints.values.md}px) {
      .step-container {
        padding: 40px 0;
      }
    }
  `;
});

interface StepContainerProps {
  children: ReactNode;
}

const StepContainer: React.FC<StepContainerProps> = ({ children }) => {
  return (
    <StyledStepContainer>
      <Paper>
        <Grid container>
          <Grid xs={2}>&nbsp;</Grid>
          <Grid xs={8}>
            <div className="step-container">{children}</div>
          </Grid>
          <Grid xs={2}>&nbsp;</Grid>
        </Grid>
      </Paper>
    </StyledStepContainer>
  );
};

export default StepContainer;
