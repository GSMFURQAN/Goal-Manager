import { useTheme } from "@emotion/react";
import { Box, Button, Stack, Switch, Typography, useMediaQuery } from "@mui/material";
import React, { Component, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {  selectView } from "../redux/generalSlice";
import { getProgress } from "../redux/donutSlice";

const SemiDonut = () => {
    const [data, setData] = useState({
        options: {
            labels: ["Completed", "Pending", "Elapsed"],
            colors:['#7FFF00', '#00FFFF', '#EA3546'],
      chart: {
        type: "donut",
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1000,
            // animateGradually: {
            //     enabled: true,
            //     delay: 150
            // },
            // dynamicAnimation: {
            //     enabled: true,
            //     speed: 350
            // }
        }
},
legend: {
  labels: {
    colors: ['#7FFF00', '#00FFFF', '#EA3546'], // Set the legend text colors here
    useSeriesColors: false
  }
},
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut:{size:'35'}
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series:[]
  });

  const general = useSelector((state) => state.general);
  const progress = useSelector((state) => state.progress);
  const theme = useTheme();
  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const handleAddNewTodo = () => {
    setOpen(true);
    dispatch(selectView({ ...general, addGoalOpen: true }));
  };

  const completed = useMemo(() => progress?.data?.filter((x) => x.done === true).length || 0, [progress?.data]);
  const pending = useMemo(() => progress?.data?.filter((x) => x.done === false && !x.elapsed).length || 0, [progress?.data]);
  const elapsed = useMemo(() => progress?.data?.filter((x) => x.elapsed && !x.done).length || 0, [progress?.data]);

  useEffect(() => {
    if (progress?.data) {
      setData((prevData) => ({
        ...prevData,
        series: [completed, pending, elapsed],
      }));
    }
  }, [progress?.data, completed, pending, elapsed]);

  useMemo(() => {
    dispatch(getProgress({ dayView: !checked ? general.dayView : "all" }));
  }, [checked, general.dayView, ]);

  React.useEffect(() => {
    setChecked(false);
  }, [general.dayView]);

  return (
    <div className="donut">
      {general?.progressOpen && (
        <Stack width={"24%"} position={"relative"} px={3}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              mx: "100%",
              width: "136px",
              mt: "36px",
              display: { xs: "none", lg: "flex", md: "flex" },
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
              {general?.dayView}
            </Typography>
            <Switch
              checked={checked}
              onChange={() => setChecked(!checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Typography>All</Typography>
          </Stack>
          <Chart
            options={data?.options}
            series={data?.series}
            type="donut"
            width="380"
           
          />
        </Stack>
      )}
    </div>
  );
};

export default SemiDonut;
