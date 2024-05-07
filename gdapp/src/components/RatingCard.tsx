import * as React from "react";
import { TextField } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import RatingPost from "./RatingPost";

interface Props {
  onClick?: () => void;
  user?: any;
  levelId: string;
  isPlat: number;
}

export const RatingCard = ({ onClick, user, levelId, isPlat }: Props) => {
  const [userEnjoyment, setUserEnjoyment] = useState("");
  const [userDifficulty, setUserDifficulty] = useState("");
  const [userTime, setUserTime] = useState("");

  async function postData() {
    let headers = new Headers();
    headers.append("Token", user);
    const formData = new FormData();
    formData.append("Levelid", levelId);
    formData.append("Enjoyment", userEnjoyment);
    formData.append("Difficultyrating", userDifficulty);
    console.log(isPlat);
    if (isPlat === 1) {
      formData.append("Usertimerating", userTime);
    }

    fetch("http://localhost:5000/addRating", {
      method: "POST",
      headers: headers,
      body: formData,
    }).then((response) => {
      console.log(response);
      window.location.assign("/level/" + levelId);
      response.text().then();
    });
  }

  async function deletePostData() {
    let headers = new Headers();
    headers.append("Token", user);
    const formData = new FormData();
    formData.append("Levelid", levelId);
    fetch("http://localhost:5000/deleteRating", {
      method: "POST",
      headers: headers,
      body: formData,
    }).then((response) => {
      console.log(response);
      window.location.assign("/level/" + levelId);
      response.text().then();
    });
  }

  return (
    <div>
      <TextField
        sx={{ m: 2, width: "10vw" }}
        id="outlined-basic"
        label="Enjoyment"
        variant="filled"
        value={userEnjoyment}
        color="secondary"
        onChange={(e) => setUserEnjoyment(e.target.value)}
      ></TextField>
      <TextField
        sx={{ m: 2, width: "10vw" }}
        id="outlined-basic"
        label="Difficulty"
        variant="filled"
        value={userDifficulty}
        color="secondary"
        onChange={(e) => setUserDifficulty(e.target.value)}
      ></TextField>

      {{ isPlat } && (
        <TextField
          sx={{ m: 2, width: "10vw" }}
          id="outlined-basic"
          label="Completion Time"
          variant="filled"
          value={userTime}
          color="secondary"
          onChange={(e) => setUserTime(e.target.value)}
        ></TextField>
      )}

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ minHeight: "10vh", bgcolor: "#B3ABB1" }}
      >
        <Button color="secondary" onClick={postData}>
          Post
        </Button>

        <Button color="secondary" onClick={deletePostData}>
          Delete Previous Post
        </Button>
      </Grid>
    </div>
  );
};

export default RatingCard;
