import { useState } from "react";
import OpenRentLogoGrey from "/openrent-logo-grey.png";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
    border-bottom: 2px solid ${theme.palette.primary.light};
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NavTop: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
            <Button variant="outlined" onClick={handleOpenModal}>
              Save and exit
            </Button>
          </div>
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Exiting process
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              At this point we would:
              <br />
              1) Save current progress <br />
              2) Redirect/navigate back to dashboard
            </Typography>
          </Box>
        </Modal>
      </Container>
    </StyledNavTop>
  );
};

export default NavTop;
