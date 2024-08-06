import { useEffect } from "react";
import { styled } from "@mui/material/styles";

const StyledStepLocation = styled("nav")(() => {
  return `
    display: block;
  `;
});

interface StepLocationProps {
  viewedCallback: (index: number) => void;
  stepIndex: number;
}

const StepLocation: React.FC<StepLocationProps> = ({
  viewedCallback,
  stepIndex,
}) => {
  useEffect(() => {
    viewedCallback(stepIndex);
  }, [viewedCallback, stepIndex]);

  return <StyledStepLocation>[STEP LOCATION]</StyledStepLocation>;
};

export default StepLocation;
