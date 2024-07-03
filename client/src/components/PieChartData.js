import {
  Box,
  Button,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  selectView } from "../redux/generalSlice";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import { getProgress } from "../redux/donutSlice";

const PieChartData = () => {
  const general = useSelector((state) => state.general);
  const progress = useSelector((state) => state.progress);
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [progressData, setProgressData] = React.useState({
    completed: 0,
    incomplete: 0,
    elapsed: 0,
  });

  const handleAddNewTodo = () => {
    setOpen(true);
    dispatch(selectView({ ...general, addGoalOpen: true }));
  };
  let completed = progress?.data?.filter((x) => x.done === true).length;
  let incomplete = progress?.data?.filter(
    (x) => x.done === false && !x.elapsed
  ).length;
  let elapsed = progress?.data?.filter((x) => x.elapsed && !x.done).length;

  React.useMemo(() => {
    setProgressData({
      completed: completed,
      pending: incomplete,
      elapsed: elapsed,
    });
  }, [progress.data]);

    // React.useEffect(() => {
    //   console.log('smx',general.progressOpen, isNotSmallScreen)
    //   dispatch(selectView({ ...general, progressOpen: isNotSmallScreen }));
    // }, [isNotSmallScreen]);

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
  };
  return (
    <div>
      {general.progressOpen && (
        <Stack width={"24%"} position={"relative"} px={3}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              mx:'100%',
              width: "136px",
              mt: '36px',
              display: { xs: "none", lg:'flex', md:'flex' },
            }}
            onClick={() => {
              handleAddNewTodo();
            }}
          >
            Add Goal
          </Button>
          <Stack
            direction="row"
            mx={"100%"}
            my={2}
            // spacing={1}
            alignItems="center"
          >
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
          <Box mx={{ sm: "100%", xs: "100%", md: "auto", lg: "auto" }}>
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
        </Stack>
      )}
    </div>
  );
};

export default PieChartData;
