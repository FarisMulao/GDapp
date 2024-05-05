import Navbar from "../components/Navbar";
import LevelCard from "../components/LevelCard";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

function HomePage() {
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
        const data = Object.values(json).map((listing: any) => {
          return <LevelCard difficulty={listing.difficulty}></LevelCard>;
        });
        return data;
      });
    return dat;
  }

  let lev = [
    [1, 129302932],
    [2, 129302932],
    [3, 129302932],
    [4, 129302932],
    [5, 129302932],
    [6, 129302932],
    [7, 129302932],
    [8, 129302932],
    [9, 129302932],
    [10, 129302932],
  ];
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
        {lev.map((lev) => (
          <Link to="/level/12">
            <LevelCard
              difficulty={lev[0]}
              levelId={lev[1]}
              levelName="temp"
            ></LevelCard>
          </Link>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
