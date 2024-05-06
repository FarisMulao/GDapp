import Navbar from "../components/Navbar";
import LevelCard from "../components/LevelCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "../components/SignUp";

function HomePage() {
  const [levelData, setLevelData] = useState([
    <LevelCard difficulty={1}></LevelCard>,
  ]);

  useEffect(() => {
    getLevels();
  }, []);
  //for /filterLevel -- GET
  async function getLevels() {
    let headers = new Headers();
    headers.append("Lowdifficultyrating", "1");
    headers.append("Highdifficultyrating", "10");
    let dat = await fetch("http://localhost:5000/filterLevel", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const data = Object.values(json).map((listing: any) => {
          return (
            <LevelCard
              difficulty={listing.difficulty}
              levelId={listing.levelId}
              levelName={listing.levelName}
            ></LevelCard>
          );
        });
        return data;
      });
    setLevelData(dat);
    console.log(levelData);
  }

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
        {levelData}
      </Grid>
    </div>
  );
}

export default HomePage;
