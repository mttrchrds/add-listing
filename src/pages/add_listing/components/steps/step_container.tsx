import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const StyledStepContainer = styled("section")(({ theme }) => {
  return `
    .step-container {
      padding: 0;
    }
    @media screen and (min-width: ${theme.breakpoints.values.md}px) {
      .step-container {
        padding: 0;
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
      <Grid container>
        <Grid xs={0} sm={1} md={2}>
          &nbsp;
        </Grid>
        <Grid xs={12} sm={10} md={8}>
          <div className="step-container">{children}</div>
        </Grid>
        <Grid xs={0} sm={1} md={2}>
          &nbsp;
        </Grid>
      </Grid>
    </StyledStepContainer>
  );
};

export default StepContainer;
