import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

const StyledNavBottom = styled("nav")(({ theme }) => {
  return `
    margin-top: 20px;
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
    }
  `;
});

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
              <Button variant="outlined" size="large">
                Preview
              </Button>
              <Button variant="contained" size="large" onClick={nextCallback}>
                Next
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </StyledNavBottom>
  );
};

export default NavBottom;
