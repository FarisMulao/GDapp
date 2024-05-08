import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import LogIn from "../components/LogIn";

interface Props {
  username?: string;
  setUser: (user: any) => void;
  setUserName: (userName: string) => void;
}

function LogInPage({ setUser, setUserName }: Props) {
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
        <LogIn setUser={setUser} setUserName={setUserName}></LogIn>
      </Grid>
    </div>
  );
}

export default LogInPage;
