import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

function AddListing() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h3" gutterBottom>
            Add your listing
          </Typography>
        </Grid>
        <Grid container xs={12} spacing={2}>
          <Grid xs>&nbsp;</Grid>
          <Grid xs={8}></Grid>
          <Grid xs>&nbsp;</Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddListing;
