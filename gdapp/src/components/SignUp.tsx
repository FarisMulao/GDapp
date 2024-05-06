import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import faces from "./images/difficulty-faces.png";
import { CroppedImage } from "./CroppedImage";
import { Link } from "react-router-dom";

interface Props {
  userName?: string;
  password?: string;
}

export const SignUp = ({ userName, password }: Props) => {
  return (
    <div>
      <Box
        sx={{
          bgcolor: "#342F31",
          height: "70vh",
          width: "30vw",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#F3BB3B",
            pt: 2,
          }}
        >
          Sign Up
        </Typography>
      </Box>
    </div>
  );
};

export default SignUp;
