import OpenRentLogoGrey from "/openrent-logo-grey.png";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const StyledNavTop = styled("nav")(({ theme }) => {
  return `
    .nav-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
    padding: 16px 0;
    border-bottom: 2px solid ${theme.palette.primary.main};
    @media screen and (min-width: ${theme.breakpoints.values.sm}px) {
      .logo {}
      .title {}
      .actions {}
    }
    @media screen and (min-width: ${theme.breakpoints.values.lg}px) {
      padding: 32px 0;
    }
  `;
});

const NavTop: React.FC = () => {
  return (
    <StyledNavTop>
      <Container>
        <div className="nav-container">
          <div className="logo">
            <img src={OpenRentLogoGrey} />
          </div>
          <div className="title">
            <Typography variant="h5">Add/edit listing</Typography>
          </div>
          <div className="actions">
            <Button variant="outlined">Save and exit</Button>
          </div>
        </div>
      </Container>
    </StyledNavTop>
  );
};

export default NavTop;
