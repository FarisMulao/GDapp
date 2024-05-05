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
        <LevelCard difficulty={1}></LevelCard>
        <LevelCard difficulty={2}></LevelCard>
        <LevelCard difficulty={3}></LevelCard>
        <LevelCard difficulty={4}></LevelCard>
        <LevelCard difficulty={5}></LevelCard>
        <LevelCard difficulty={6}></LevelCard>
        <LevelCard difficulty={7}></LevelCard>
        <LevelCard difficulty={8}></LevelCard>
        <LevelCard difficulty={9}></LevelCard>
        <LevelCard difficulty={10}></LevelCard>
      </Grid>
    </div>
  );
}

export default App;
