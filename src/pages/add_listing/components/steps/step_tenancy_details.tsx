import { styled } from "@mui/material/styles";

import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";

const StyledStepTenancyDetails = styled("div")(() => {
  return `
    display: block;
  `;
});

interface StepTenancyDetailsProps {
  backCallback: () => void;
  nextCallback: (payload: unknown) => void;
}

const StepTenancyDetails: React.FC<StepTenancyDetailsProps> = ({
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
    <StyledStepTenancyDetails>
      <StepContainer>
        <div>[STEP TENANCY DETAILS]</div>
      </StepContainer>
      <NavBottom
        lastStep={true}
        backCallback={handleClickBack}
        nextCallback={handleSubmitStep}
      />
    </StyledStepTenancyDetails>
  );
};

export default StepTenancyDetails;
