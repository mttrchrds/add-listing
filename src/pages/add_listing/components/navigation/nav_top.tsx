import OpenRentLogoGrey from "/openrent-logo-grey.png";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StyledNavTop = styled("nav")(({ theme }) => {
  return `
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      flex-grow: 1;
      justify-content: flex-start;
      img {
        width: 152px;
      }
    }
    .title {
      flex-shrink: 0;
    }
    .actions {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }
    width: 100%;
    padding: 16px;
    border-bottom: 2px solid ${theme.palette.primary.main};
    @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
      .logo {}
      .title {}
      .actions {}
    }
    @media screen and (min-width: ${theme.breakpoints.values.lg}px) {
      padding: 20px 32px;
    }
  `;
});

const NavTop: React.FC = () => {
  return (
    <StyledNavTop>
      <div className="logo">
        <img src={OpenRentLogoGrey} />
      </div>
      <div className="title">
        <Typography variant="h5">Add/edit listing</Typography>
      </div>
      <div className="actions">
        <Button variant="outlined">Save and exit</Button>
      </div>
    </StyledNavTop>
  );
};

export default NavTop;
