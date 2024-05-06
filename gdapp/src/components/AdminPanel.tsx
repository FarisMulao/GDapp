import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Dialog, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  children?: string;
  onClick?: () => void;
  openBool: boolean;
  user?: any;
}

export const AdminPanel = ({ onClick, openBool, children, user }: Props) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [levelId, setLevelId] = React.useState("");
  const [songId, setSongId] = React.useState("");
  const [songName, setSongName] = React.useState("");
  const [artistName, setArtistName] = React.useState("");
  const [wrId, setWrId] = React.useState("");
  const [wrTime, setwrTime] = React.useState("");

  const handleClickClose = () => {
    openBool = false;
  };

  async function addLevel() {
    let headers = new Headers();
    headers.append("Token", user);
    headers.append("Levelid", levelId);
    fetch("http://localhost:5000/admin/addLevel", {
      method: "POST",
      headers: headers,
    }).then((response) => {
      console.log(response);
      response.text().then();
      window.location.assign("/");
    });
  }

  return (
    <div>
      <Dialog onClose={() => (openBool = false)} open={openBool}>
        <Container fixed>
          <Box sx={{ bgcolor: "white", width: "30vw", height: "50vh" }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Level ID"
                variant="outlined"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
              ></TextField>

              <Button onClick={() => addLevel()}>Add Level</Button>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Song Name"
                variant="outlined"
                value={songName}
                onChange={(e) => setLevelId(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Song ID"
                variant="outlined"
                value={songId}
                onChange={(e) => setSongId(e.target.value)}
              ></TextField>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Artist Name"
                variant="outlined"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              ></TextField>

              <Link to="/" reloadDocument>
                <Button onClick={handleClickClose}>Add Song</Button>
              </Link>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Song ID"
                variant="outlined"
                value={songId}
                onChange={(e) => setSongId(e.target.value)}
              ></TextField>
              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Level ID"
                variant="outlined"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
              ></TextField>
              <Link to="/" reloadDocument>
                <Button onClick={handleClickClose}>Add Song To Level</Button>
              </Link>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="WR ID"
                variant="outlined"
                value={wrId}
                onChange={(e) => setWrId(e.target.value)}
              ></TextField>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Level ID"
                variant="outlined"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
              ></TextField>

              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="WR Time"
                variant="outlined"
                value={wrTime}
                onChange={(e) => setwrTime(e.target.value)}
              ></TextField>
              <Link to="/" reloadDocument>
                <Button onClick={handleClickClose}>Add WR To Level</Button>
              </Link>
            </Grid>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
