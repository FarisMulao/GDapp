import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import SignUp from "../components/SignUp";

function SignUpPage() {
  return (
    <div>
      <Navbar></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "90.5vh", bgcolor: "#B3ABB1" }}
      >
        <SignUp></SignUp>
      </Grid>
    </div>
  );
}

export default SignUpPage;
