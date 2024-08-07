import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledNavBottom = styled("nav")(({ theme }) => {
  return `
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid ${theme.palette.primary.light};
    .prev-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .next-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        margin-left: 20px;
      }
    }
    @media screen and (min-width: ${theme.breakpoints.values.lg}px) {
      margin-top: 40px;
      padding-top: 40px;
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

interface NavBottomProps {
  backCallback: () => void;
  nextCallback: () => void;
  firstStep?: boolean;
  lastStep?: boolean;
}

const NavBottom: React.FC<NavBottomProps> = ({
  backCallback,
  nextCallback,
  firstStep = false,
  lastStep = false,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <StyledNavBottom>
      <Grid container>
        <Grid xs={6}>
          {!firstStep && (
            <div className="prev-container">
              <Button variant="contained" size="large" onClick={backCallback}>
                Back
              </Button>
            </div>
          )}
        </Grid>
        <Grid xs={6}>
          {!lastStep && (
            <div className="next-container">
              <Button variant="outlined" size="large" onClick={handleOpenModal}>
                Preview
              </Button>
              <Button variant="contained" size="large" onClick={nextCallback}>
                Next
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Preview listing
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            At this point we would:
            <br />
            1) Display a view of the rendered listing in a modal
            <br />
            2) Add data we've captured so far to relevant sections
            <br />
            3) Add placeholder/skeleton text for areas that don't yet have data
          </Typography>
        </Box>
      </Modal>
    </StyledNavBottom>
  );
};

export default NavBottom;
