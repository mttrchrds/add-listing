import { styled } from "@mui/material/styles";

import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";

const StyledStepPropertyDetails = styled("div")(() => {
  return `
    display: block;
  `;
});

interface StepPropertyDetailsProps {
  backCallback: () => void;
  nextCallback: (payload: unknown) => void;
}

const StepPropertyDetails: React.FC<StepPropertyDetailsProps> = ({
  backCallback,
  nextCallback,
}) => {
  const handleSubmitStep = () => {
    nextCallback({
      something: "anything",
    });
  };

  const handleClickBack = () => {
    backCallback();
  };

  return (
    <StyledStepPropertyDetails>
      <StepContainer>
        <div>[STEP PROPERTY DETAILS]</div>
      </StepContainer>
      <NavBottom
        backCallback={handleClickBack}
        nextCallback={handleSubmitStep}
      />
    </StyledStepPropertyDetails>
  );
};

export default StepPropertyDetails;
