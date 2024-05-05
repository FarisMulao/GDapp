import Navbar from "./components/Navbar";
import LevelCard from "./components/LevelCard";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel";

function App() {
  /*
  useEffect(() => {
    getLevels();
  }, []);
  
  async function getLevels() {
    let base64 = require("base-64");
    let headers = new Headers();
    let username = "admin";
    let password = "password";
    headers.append(
      "Authorization",
      "Basic " + base64.encode(username + ":" + password)
    );
    let dat = await fetch("http://localhost:3306/api/foundItems/getAllItem", {
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
 */
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
    <div className="App">
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
          <LevelCard
            difficulty={lev[0]}
            levelId={lev[1]}
            levelName="temp"
          ></LevelCard>
        ))}
      </Grid>
    </div>
  );
}

export default App;
