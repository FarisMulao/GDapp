import Navbar from "./components/Navbar";
import LevelCard from "./components/LevelCard";
import { Box, Button, Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
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
