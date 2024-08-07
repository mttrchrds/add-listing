import { styled } from "@mui/material/styles";

import { AdvertType, DescriptionType } from "../../../../utils/enums";

import StepContainer from "./step_container";
import NavBottom from "../navigation/nav_bottom";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const StyledStepTenancyDetails = styled("div")(() => {
  return `
    .alert-container {
      margin-bottom: 30px;
    }
    .data-container {
      display: block;
      width: 100%;
      margin-top: 20px;
      border: 1px solid grey;
      border-radius: 4px;
      background-color: "#cecece";
      padding: 30px;
    }
  `;
});

interface StepTenancyDetailsProps {
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  lat: number;
  lng: number;
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
}

const StepTenancyDetails: React.FC<StepTenancyDetailsProps> = ({
  address1,
  address2,
  address3,
  postCode,
  lat,
  lng,
  advertType,
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
}) => {
  const handleClickBack = () => {
    backCallback();
  };

  return (
    <StyledStepTenancyDetails>
      <StepContainer>
        <div className="alert-container">
          <Alert>
            <AlertTitle>End of prototype</AlertTitle>I ran out of time! 😢
          </Alert>
        </div>

        <Typography variant="h6" gutterBottom>
          Data captured so far
        </Typography>
        <code className="data-container">
          Address1: {address1}
          <br />
          Address2: {address2}
          <br />
          Town: {address3}
          <br />
          Post code: {postCode}
          <br />
          Latitude: {lat}
          <br />
          Longitute: {lng}
          <br />
          Advert type: {advertType}
          <br />
          Property type: {propertyType}
          <br />
          Bedrooms number: {bedroomsNumber}
          <br />
          Bathrooms number: {bathroomsNumber}
          <br />
          Furnishing: {furnishing}
          <br />
          Bills included: {billsIncluded ? "true" : "false"}
          <br />
          Garden access: {gardenAccess ? "true" : "false"}
          <br />
          Parking: {parking ? "true" : "false"}
          <br />
          Fireplace: {fireplace ? "true" : "false"}
          <br />
          Description type: {descriptionType}
          <br />
          Description: {description}
          <br />
        </code>
      </StepContainer>
      <NavBottom
        lastStep={true}
        backCallback={handleClickBack}
        nextCallback={() => false}
      />
    </StyledStepTenancyDetails>
  );
};

export default StepTenancyDetails;
