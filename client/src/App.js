import React from "react";
import Home from "./components/common/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {  useSelector } from "react-redux";
import CalendarPage from "./components/Calendars/CalendarPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import TimeLinePage2 from "./components/TimeLine/TimeLinePage2";
import Signup from "./auth.js/signup";
import Login from "./auth.js/login";
import { useTheme } from "@mui/material/styles";
import { GlobalStyles, Paper, styled, useMediaQuery } from "@mui/material";
import MobileTimeLine from "./components/TimeLine/MobileTimeLine";
import Navbar from "./components/common/Navbar";
import EditableTabs from "./components/common/MyTabs";
function App() {
  const generalState = useSelector((state) => state.general);
  const theme = useTheme();
  let account = JSON?.parse(sessionStorage?.getItem("account"));
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const darkTheme = createTheme({
    palette: {
      mode: generalState.theme ? "dark" : "light",
    },
  });
  const globalStyles = (
    <GlobalStyles
      styles={{
        body: {
          backgroundImage: `url(${
            generalState?.bgImg ? generalState?.bgImg : account?.bgImg
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: 0,
          padding: 0,
          minHeight: "98vh",
          width: "100%",
          maxHeight: "auto",
        },
      }}
    />
  );
  const GlassPaper = styled(Paper)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(1px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",

    // padding: theme.spacing(3),
    // margin: theme.spacing({xs:0.5, sm:0.5, md:3, lg:3, xl:3})
  }));
  const [progressView, setProgressView] = React.useState(false);

  return (
    // <ColorModeContext.Provider value={theme}>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {globalStyles}
      <BrowserRouter>
        <GlassPaper
          sx={{
            my: { xs: 0.5, sm: 1, md: 1, lg: 1, xl: 1 },
            mx: { xs: 0.5, sm: 3, md: 3, lg: 3, xl: 3 },
            padding: { xs: 0.2, sm: 2, md: 3, lg: 3, xl: 3 },
          }}
        >
          <Navbar progressView={progressView} setProgressView={setProgressView}/>
          <Routes>
            <Route path="/" exact element={<Home progressView={progressView} setProgressView={setProgressView}/>} />
            {/* <Route path="/" exact element={<EditableTabs />} /> */}
            <Route path="/calendar" exact element={<CalendarPage />} />
            <Route
              path="/timeLine"
              exact
              element={
                !isNotSmallScreen ? <MobileTimeLine /> : <TimeLinePage2 />
              }
            />
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
