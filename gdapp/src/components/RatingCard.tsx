import * as React from "react";
import { TextField } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Button from "@mui/material/Button";

interface Props {
  onClick?: () => void;
  user?: any;
}

export const RatingCard = ({ onClick, user }: Props) => {
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
    formData.append("Usertimerating", userTime);
    fetch("http://localhost:5000/addRating", {
      method: "POST",
      headers: headers,
    }).then((response) => {
      console.log(response);
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

      <TextField
        sx={{ m: 2, width: "10vw" }}
        id="outlined-basic"
        label="Completion Time"
        variant="filled"
        value={userTime}
        color="secondary"
        onChange={(e) => setUserTime(e.target.value)}
      ></TextField>

      <Button color="secondary" onClick={postData}>
        Post
      </Button>
    </div>
  );
};

export default RatingCard;
