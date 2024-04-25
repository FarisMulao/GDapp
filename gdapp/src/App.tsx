import { Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import LevelCard from "./components/LevelCard";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>

      <LevelCard difficulty={3}></LevelCard>
    </div>
  );
}

export default App;
