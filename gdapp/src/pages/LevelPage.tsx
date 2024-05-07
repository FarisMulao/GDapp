import Navbar from "../components/Navbar";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LevelInfo from "../components/LevelInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LineStyle } from "@mui/icons-material";
import RatingCard from "../components/RatingCard";
import RatingPost from "../components/RatingPost";

interface Props {
  user?: any;
}

function LevelPage({ user }: Props) {
  const [levelData, setLevelData] = useState([
    <LevelInfo difficulty={1} songs={[""]}></LevelInfo>,
  ]);

  const [ratingData, setRatingData] = useState([<Typography></Typography>]);
  const { id } = useParams();
  let PLT = 0;
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

  useEffect(() => {
    getRatings();
  }, []);
  //for /getLevelInformation -- GET
  async function getLevels() {
    let headers = new Headers();
    headers.append("Levelid", replacment);
    await fetch("http://localhost:5000/getLevelInformation", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(json.Platformer);
        PLT = json.isPlatformer;
        const foo = (
          <LevelInfo
            levelId={replacment}
            length={json.length}
            creatorUsername={json.creator_username}
            difficulty={json.difficulty ?? "None"}
            wrTime={json.wrTime ?? "0"}
            wrUsername={json.wrUsername ?? "None"}
            avgEnjoyment={json.avgEnjoyment ?? "Not Available"}
            avgTime={json.avgTime ?? "None"}
            songs={json.songs.songName ?? "None"}
            isPlatformer={json.isPlatformer}
            levelName={json.levelName}
          ></LevelInfo>
        );
        setLevelData([foo]);
      });
  }

  async function getRatings() {
    let headers = new Headers();
    headers.append("Levelid", replacment);
    await fetch("http://localhost:5000/getRatings", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const foo = <Typography>{json.Enjoyment}</Typography>;
        console.log(foo);
        setRatingData([foo]);
      });
  }

  return (
    <div>
      <Navbar user={user}></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "100vh", bgcolor: "#B3ABB1" }}
      >
        {levelData}

        <Box sx={{ mt: 5, bgcolor: "#B3ABB1" }}>
          <RatingCard
            user={user}
            levelId={replacment}
            isPlat={PLT ?? 0}
          ></RatingCard>

          <Typography>{ratingData}</Typography>

          <RatingPost></RatingPost>
        </Box>
      </Grid>
    </div>
  );
}

export default LevelPage;
