import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

interface Props {
  onClick?: () => void;
}

export const RatingPost = ({ onClick }: Props) => {
  const [userEnjoyment, setUserEnjoyment] = useState("");
  const [userDifficulty, setUserDifficulty] = useState("");
  const [userTime, setUserTime] = useState("");

  return (
    <div>
      <Box sx={{ color: "#342F31" }}>
        <Typography sx={{ color: "#F3BB3B" }}>Difficulty</Typography>
        <Typography sx={{ color: "#F3BB3B" }}>Enjoyment</Typography>
        <Typography sx={{ color: "#F3BB3B" }}>Time</Typography>
      </Box>
    </div>
  );
};

export default RatingPost;
