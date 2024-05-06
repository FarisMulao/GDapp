import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/level/:id" element={<LevelPage></LevelPage>} />
        <Route path="/signup" element={<SignUpPage></SignUpPage>} />
        <Route path="/login" element={<LogInPage></LogInPage>} />
      </Routes>
    </div>
  );
}

export default App;
