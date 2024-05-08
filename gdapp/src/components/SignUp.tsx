import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

interface Props {
  userName?: string;
  password?: string;
  GDID?: string;
  email?: string;
}

export const SignUp = ({ userName, password, GDID, email }: Props) => {
  const [userNameData, setUserNameData] = React.useState("");
  const [passwordData, setPasswordData] = React.useState("");
  const [GDIDData, setGDIDData] = React.useState("");
  const [emailData, setEmailData] = React.useState("");
  userName = userNameData;
  password = passwordData;
  GDID = GDIDData;
  email = emailData;
  async function signUpUser() {
    let headers = new Headers();
    headers.append("Username", userNameData);
    headers.append("Password", passwordData);
    /*
    if (GDIDData !== null || GDIDData !== undefined) {
      headers.append("GameAccountID", GDIDData);
    }
    */

    headers.append("Email", emailData);

    fetch("http://localhost:5000/createaccount", {
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
          height: "62vh",
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
          Sign Up
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
        <TextField
          sx={{ m: 2, width: "27.6vw" }}
          id="outlined-basic"
          label="GD Account ID"
          variant="filled"
          value={GDIDData}
          color="secondary"
          onChange={(e) => setGDIDData(e.target.value)}
        ></TextField>
        <TextField
          sx={{ m: 2, width: "27.6vw" }}
          id="outlined-basic"
          label="Email"
          variant="filled"
          value={emailData}
          color="secondary"
          onChange={(e) => setEmailData(e.target.value)}
        ></TextField>
        <Link to="/">
          <Button
            sx={{ color: "#342F31", size: "large", px: 3 }}
            onClick={() => signUpUser()}
          >
            Submit
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default SignUp;
