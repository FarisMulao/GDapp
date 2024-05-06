import Navbar from "../components/Navbar";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LevelInfo from "../components/LevelInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LineStyle } from "@mui/icons-material";

function LevelPage() {
  const [levelData, setLevelData] = useState([
    <LevelInfo difficulty={1}></LevelInfo>,
  ]);
  const { id } = useParams();
  let replacment: string;
  console.log(id);
  if (id === undefined || id === null) {
    replacment = "0";
  } else {
    replacment = id;
  }
  useEffect(() => {
    getLevels();
  }, []);
  //for /getLevelInformation -- GET
  async function getLevels() {
    let headers = new Headers();
    headers.append("Levelid", replacment);
    let dat = await fetch("http://localhost:5000/getLevelInformation", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        const foo = (
          <LevelInfo
            levelId={replacment}
            length={json.length}
            creatorUsername={json.creator_username}
            //difficulty={listing.difficulty}
            difficulty={3}
            //wrUsername={listing.wrUsername}
            wrTime={120}
            //wrUsername={"fartlord"}
            //wrTime={listing.wrTIme}
            //avgEnjoyment={listing.avgEnjoyment}
            avgTime={json.avgTime ?? "None"}
            //songs={listing.songs}
            //isPlatformer={listing.isPlatformer}
            //creatorUsername={listing.creator_username}
          ></LevelInfo>
        );
        setLevelData([foo]);
      });
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

export default LevelPage;
