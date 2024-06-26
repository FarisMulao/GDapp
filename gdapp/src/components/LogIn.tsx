import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

interface Props {
  userName?: string;
  password?: string;
  setUser: (user: any) => void;
  setUserName: (userName: string) => void;
}

export const LogIn = ({ userName, password, setUser, setUserName }: Props) => {
  const [userNameData, setUserNameData] = React.useState("");
  const [passwordData, setPasswordData] = React.useState("");
  userName = userNameData;
  password = passwordData;
  setUserName(userNameData);
  async function logInUser() {
    let headers = new Headers();
    headers.append("Username", userNameData);
    headers.append("Password", passwordData);
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: headers,
    }).then((response) => {
      console.log(response);
      response.text().then((text) => setUser(text));
      //setUser(response.body); // make sure response is a valid response (bad password etc)
    });
  }

  return (
    <div>
      <Box
        sx={{
          bgcolor: "#a8959d",
          height: "40vh",
          width: "30vw",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#342F31",
            pt: 2,
          }}
        >
          Log In
        </Typography>
        <TextField
          sx={{ m: 2, width: "27.6vw" }}
          id="outlined-basic"
          label="Username"
          variant="filled"
          value={userNameData}
          color="secondary"
          onChange={(e) => setUserNameData(e.target.value)}
        ></TextField>
        <TextField
          sx={{ m: 2, width: "27.6vw" }}
          id="outlined-basic"
          label="Password"
          variant="filled"
          value={passwordData}
          color="secondary"
          onChange={(e) => setPasswordData(e.target.value)}
        ></TextField>
        <Link to="/">
          <Button
            sx={{ color: "#342F31", size: "large", px: 3 }}
            onClick={() => logInUser()}
          >
            Submit
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default LogIn;
