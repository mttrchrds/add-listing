import { useState } from "react";
import { styled } from "@mui/material/styles";

import { AdvertType } from "../../../../utils/enums";

import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import HouseIcon from "@mui/icons-material/House";
import SingleBedIcon from "@mui/icons-material/SingleBed";

const StyledStepPropertyDetails = styled("div")(() => {
  return `
    display: block;
  `;
});

export interface PropertyDetailsPayload {
  advertType: AdvertType;
}

interface StepPropertyDetailsProps {
  advertType: AdvertType;
  backCallback: () => void;
  nextCallback: (payload: PropertyDetailsPayload) => void;
}

const StepPropertyDetails: React.FC<StepPropertyDetailsProps> = ({
  advertType = AdvertType.WHOLE,
  backCallback,
  nextCallback,
}) => {
  const [formValueAdvertType, setFormValueAdvertType] = useState(advertType);
  // const [formValuePropertyType, setFormValuePropertyType] =
  //   useState(propertyType);

  const handleSubmitStep = () => {
    nextCallback({
      advertType,
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
  };

  return (
    <StyledStepPropertyDetails>
      <StepContainer>
        <Stack spacing={2}>
          <ToggleButtonGroup
            color="primary"
            value={formValueAdvertType}
            exclusive
            onChange={handleChangeAdvertType}
            aria-label="Advert type"
            fullWidth={true}
          >
            <ToggleButton value={AdvertType.WHOLE}>
              <Stack spacing={2} direction="row">
                <HouseIcon />
                <Typography variant="body1" paragraph={true}>
                  Whole Property
                </Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton value={AdvertType.ROOM}>
              <Stack spacing={2} direction="row">
                <SingleBedIcon />
                <Typography variant="body1" paragraph={true}>
                  Single room
                </Typography>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
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
