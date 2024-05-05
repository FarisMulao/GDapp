import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/level/:id" element={<LevelPage></LevelPage>} />
      </Routes>
    </div>
  );
}

export default App;
