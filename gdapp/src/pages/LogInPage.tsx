import Navbar from "../components/Navbar";
import LevelCard from "../components/LevelCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

function LogInPage() {
  return (
    <div>
      <Navbar></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "100vh", bgcolor: "#B3ABB1" }}
      >
        <></>
      </Grid>
    </div>
  );
}

export default LogInPage;
