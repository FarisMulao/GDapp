import Navbar from "../components/Navbar";
import LevelCard from "../components/LevelCard";
import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "../components/SignUp";
import LevelFilter from "../components/LevelFilter";
import { TextField } from "@mui/material";

interface Props {
  user: any;
  userName: any;
}

function HomePage({ user, userName }: Props) {
  const [levelData, setLevelData] = useState([
    <LevelCard difficulty={1}></LevelCard>,
  ]);

  const [lowData, setLowData] = useState("0");
  const [highData, setHighData] = useState("11");

  useEffect(() => {
    getLevels();
  }, []);
  //for /filterLevel -- GET
  async function getLevels() {
    let headers = new Headers();
    headers.append("Lowdifficultyrating", lowData);
    headers.append("Highdifficultyrating", highData);
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
      <Navbar user={user} userName={userName}></Navbar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "100vh", bgcolor: "#B3ABB1" }}
      >
        <div>
          <TextField
            sx={{ m: 2, width: "20vw" }}
            id="outlined-basic"
            label="Difficulty Low"
            variant="outlined"
            value={lowData}
            color="secondary"
            onChange={(e) => setLowData(e.target.value)}
          ></TextField>

          <TextField
            sx={{ m: 2, width: "20vw" }}
            id="outlined-basic"
            label="Difficulty High"
            variant="outlined"
            value={highData}
            color="secondary"
            onChange={(e) => setHighData(e.target.value)}
          ></TextField>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            sx={{ bgcolor: "#B3ABB1" }}
          >
            <Button color="secondary" onClick={getLevels}>
              Filter
            </Button>
          </Grid>
        </div>
        {levelData}
      </Grid>
    </div>
  );
}

export default HomePage;
