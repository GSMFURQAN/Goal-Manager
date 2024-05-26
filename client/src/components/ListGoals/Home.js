import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  ToggleButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchBar from "./search";
import { useDispatch, useSelector } from "react-redux";
import { getProgress, selectSnack, selectView } from "../../redux/generalSlice";
import { fetchData, updateGoal } from "../../redux/goalSlice";
import MyList from "./MyList";
import AddGoal from "./AddGoal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PieChart } from "@mui/x-charts/PieChart";
import Navbar from "./Navbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const general = useSelector((state) => state.general);
  const snack = useSelector((state) => state.snack);
const navigate = useNavigate()
  const progress = useSelector((state) => state.progress);
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [progressData, setProgressData] = React.useState({
    completed: 0,
    incomplete: 0,
    elapsed: 0,
  });
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));
  
const [progressView, setProgressView] = React.useState(false)
  let account = JSON.parse(localStorage.getItem("account"));

  React.useEffect(() => {
    if (!account) {
      navigate("login");
    } 
  }, []);
  React.useEffect(()=>{
    setProgressView(isNotSmallScreen)

  },[isNotSmallScreen])
  console.log('sda', progressView, isNotSmallScreen)
  const dispatch = useDispatch();
  let completed = progress?.data?.filter((x) => x.done === true).length;
  let incomplete = progress?.data?.filter((x) => x.done === false && !x.elapsed).length;
  let elapsed = progress?.data?.filter((x)=>x.elapsed && !x.done).length
  React.useMemo(() => {
    setProgressData({ completed: completed, incomplete: incomplete, elapsed:elapsed });
  }, [progress.data]);

  React.useEffect(() => {
    dispatch(getProgress({ dayView: !checked ? general.dayView : "all" }));
    setProgressData({ completed: completed, incomplete: incomplete });
  }, [checked, general.dayView]);

  React.useEffect(() => {
    setChecked(false);
  }, [general.dayView]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

dispatch(selectSnack({...snack, open:false}))  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Stack
        sx={{
          width: "90%",
        }}
        pt={2}
        m={"auto"}
      >
        <Navbar progressView={progressView} setProgressView={setProgressView}/>
        {/* <SearchBar /> */}
      <Stack display={"flex"} direction={{xs:"column-reverse", sm:'row', md:'row', lg:"row"}}>
          <MyList />
          {progressView && <Stack width={"30%"} position={"relative"}>
            <Stack direction="row" mx={"52px"} my={2} spacing={1} alignItems="center">
              <Typography textTransform={"capitalize"}>
                {general.dayView}
              </Typography>
              <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              <Typography>All</Typography>
            </Stack>
            <Box sx={{  }}>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: progressData.completed,
                        label: "Completed",
                        color: "green",
                      },
                      {
                        id: 1,
                        value: progressData.incomplete,
                        label: "Incomplete",
                        color: "cyan",
                      },
                      {
                        id: 2,
                        value: progressData.elapsed,
                        label: "Elapsed",
                        color: "red",
                      },
                    ],
                  },
                ]}
                width={300}
                height={150}
              />
            </Box>
          </Stack>}
        </Stack>
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical:'top', horizontal :'right'}}>
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.message}{" "}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
