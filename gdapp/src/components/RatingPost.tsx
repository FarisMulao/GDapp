import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

interface Props {
  onClick?: () => void;
  userEnjoyment: string;
  userDifficulty: string;
  userTime: string;
  userName: string;
}

export const RatingPost = ({
  onClick,
  userDifficulty,
  userEnjoyment,
  userTime,
  userName,
}: Props) => {
  return (
    <div>
      <Box sx={{ bgcolor: "#342F31", height: "18vh", p: 1, m: 1 }}>
        <Typography variant="h5" sx={{ color: "#F3BB3B" }}>
          {userName}
        </Typography>
        <Typography variant="h6" sx={{ color: "#F3BB3B" }}>
          Difficulty: {userDifficulty}
        </Typography>
        <Typography variant="h6" sx={{ color: "#F3BB3B" }}>
          Enjoyment: {userEnjoyment}
        </Typography>
        <Typography variant="h6" sx={{ color: "#F3BB3B" }}>
          Time: {userTime}
        </Typography>
      </Box>
    </div>
  );
};

export default RatingPost;
