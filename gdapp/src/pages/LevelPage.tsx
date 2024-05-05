import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LevelInfo from "../components/LevelInfo";

function LevelPage() {
  return (
    <div>
      <Navbar></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", bgcolor: "#B3ABB1" }}
      >
        <LevelInfo difficulty={1}></LevelInfo>
      </Grid>
    </div>
  );
}

export default LevelPage;
