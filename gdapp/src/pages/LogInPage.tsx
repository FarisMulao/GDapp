import Navbar from "../components/Navbar";
import LevelCard from "../components/LevelCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LogIn from "../components/LogIn";

interface Props {
  setUser: (user: any) => void;
}

function LogInPage({ setUser }: Props) {
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
        <LogIn setUser={setUser}></LogIn>
      </Grid>
    </div>
  );
}

export default LogInPage;
