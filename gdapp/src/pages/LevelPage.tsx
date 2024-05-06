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

        const data = Object.values(json).map((listing: any) => {
          console.log(
            listing?.creator_username,
            listing?.difficulty,
            listing?.wrTime,
            listing?.wrUsername,
            listing?.difficulty,
            listing?.levelID
          );
          console.log(json);
          return (
            <LevelInfo
              levelId={replacment}
              length={"medium"}
              //difficulty={listing.difficulty}
              difficulty={3}
              //wrUsername={listing.wrUsername}
              wrTime={120}
              //wrUsername={"fartlord"}
              //wrTime={listing.wrTIme}
              //avgEnjoyment={listing.avgEnjoyment}
              //avgTime={listing.avgTime}
              //songs={listing.songs}
              //isPlatformer={listing.isPlatformer}
              //creatorUsername={listing.creator_username}
            ></LevelInfo>
          );
        });
        console.log(JSON.stringify(data, null, 2));
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

export default LevelPage;
