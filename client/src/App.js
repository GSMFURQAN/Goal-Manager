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
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import TimeLinePage from "./components/TimeLine/TimeLinePage";
import TimeLinePage2 from "./components/TimeLine/TimeLinePage2";
import ImageTest from "./UnUsedComponents/ImageTest";
import Signup from "./auth.js/signup";
import Login from "./auth.js/login";
import { useTheme } from '@mui/material/styles';
import { GlobalStyles, Paper, styled, useMediaQuery } from "@mui/material";
import MobileTimeLine from "./components/TimeLine/MobileTimeLine";
function App() {
  const generalState = useSelector((state) => state.general);
  const theme = useTheme();
  let account = JSON?.parse(sessionStorage?.getItem("account"));
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));
  const darkTheme = createTheme({
    palette: {
      mode: generalState.theme ? "dark" : "light",
    },
  });
  const globalStyles = (
    <GlobalStyles
      styles={{
        body: {
          backgroundImage: `url(${account?.bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: 0,
          padding: 0,
          minHeight: '95vh',
          width: '100%',
        },
       
      }}
    />
  );
  const GlassPaper = styled(Paper)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: theme.spacing(3),
    margin: theme.spacing(3)
  }));
  
  return (
    // <ColorModeContext.Provider value={theme}>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {globalStyles}
      <BrowserRouter>
      <GlassPaper>

        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/calendar" exact element={<CalendarPage />} />
          <Route path="/timeLine" exact element={!isNotSmallScreen ? <MobileTimeLine/> : <TimeLinePage2 />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {/* <Route path="/imagetest" exact element={<ImageTest/>} /> */}
        </Routes>
      </GlassPaper>
      </BrowserRouter>
    </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}

export default App;
