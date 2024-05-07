import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LevelPage from "./pages/LevelPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<any | null>(null);

  const [userName, setUserName] = useState<any | null>(null);

  useEffect(() => {
    //this is where you would load the user
    const pendingUserName = window.sessionStorage.getItem("userName");
    console.log("pendingUserName", pendingUserName);
    setUserName(pendingUserName);
  }, []);

  useEffect(() => {
    if (userName === null) {
      return;
    }
    //save the user to session storage
    window.sessionStorage.setItem("userName", userName);
    console.log("user", userName);
  }, [userName]);

  useEffect(() => {
    //this is where you would load the user
    const pendingUser = window.sessionStorage.getItem("user");
    console.log("pendingUser", pendingUser);
    setUser(pendingUser);
  }, []);

  useEffect(() => {
    if (user === null) {
      return;
    }
    //save the user to session storage
    window.sessionStorage.setItem("user", user);
    console.log("user", user);
  }, [user]);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} userName={userName}></HomePage>}
        />
        <Route
          path="/level/:id"
          element={<LevelPage user={user} userName={userName}></LevelPage>}
        />
        <Route path="/signup" element={<SignUpPage></SignUpPage>} />
        <Route
          path="/login"
          element={
            <LogInPage setUser={setUser} setUserName={setUserName}></LogInPage>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
