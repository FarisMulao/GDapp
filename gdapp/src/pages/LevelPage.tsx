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
        sx={{ minHeight: "100vh", bgcolor: "#B3ABB1" }}
      >
        <LevelInfo
          difficulty={1}
          levelId={1293023}
          levelName="Test Level Name"
          creatorUsername="Test Creator Username"
          length="test length"
          wrTime="test wrTIme"
          wrUsername="Test wrUsername"
          avgEnjoyment={1293091023}
          avgTime="test avgTime"
          isPlatformer={false}
          songs="test song"
        ></LevelInfo>
      </Grid>
    </div>
  );
}

export default LevelPage;
