import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import faces from "./images/difficulty-faces.png";
import { CroppedImage } from "./CroppedImage";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

interface Props {
  userName?: string;
  password?: string;
}

export const LogIn = ({ userName, password }: Props) => {
  const [userNameData, setUserNameData] = React.useState("");
  const [passwordData, setPasswordData] = React.useState("");
  userName = userNameData;
  password = passwordData;
  async function logInUser() {
    let headers = new Headers();
    headers.append("Username", userNameData);
    headers.append("Password", passwordData);
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: headers,
    }).then((response) => {
      console.log(response);
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
