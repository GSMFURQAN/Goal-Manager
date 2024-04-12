import React from "react";
import SearchBar from "./components/search";
import Home from "./components/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { selectView } from "./redux/generalSlice";


function App() {
  const generalState = useSelector((state) => state.general);
  const dispatch = useDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: generalState.theme ? "dark" : "light",
    },
  });
  return (
          // <ColorModeContext.Provider value={theme}>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
       

      <Home />
      </ThemeProvider>
      // </ColorModeContext.Provider>
  );
}

export default App;
