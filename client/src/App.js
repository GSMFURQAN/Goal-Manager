import React from "react";
import SearchBar from "./components/ListGoals/search";
import Home from "./components/ListGoals/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import CalendarPage from "./components/Calendars/CalendarPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import TimeLinePage from "./components/TimeLine/TimeLinePage";
import TimeLinePage2 from "./components/TimeLine/TimeLinePage2";

function App() {
  const generalState = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const darkTheme = createTheme({
    palette: {
      mode: generalState.theme ? "dark" : "light",
    },
  });
  console.log(
    "ads",
    Array(10).map((s) => ({ s: "a" }))
  );
  return (
    // <ColorModeContext.Provider value={theme}>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/calendar" exact element={<CalendarPage />} />
          <Route path="/timeLine" exact element={<TimeLinePage2 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
