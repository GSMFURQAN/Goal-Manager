import { Box, Button, Grid, Hidden, IconButton, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../redux/generalSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddGoal from "./AddGoal";
import { getTodos } from "../../Apis/Apis";
const NavbarButtons = ({ progressView, setProgressView }) => {
  const [open, setOpen] = React.useState(false);

  const general = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const handleAddNewTodo = () => {
    setOpen(true);
  };

  return (
    <div>
      {" "}
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        py={1}
      >
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth
            variant={general.dayView === "previous" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "previous" }))
            }
          >
            Previous
          </Button>{" "}
        </Grid>
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth="12px"
            variant={general.dayView === "day" ? "contained" : "outlined"}
            onClick={() => dispatch(selectView({ ...general, dayView: "day" }))}
          >
            Today
          </Button>{" "}
        </Grid>{" "}
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth="12px"
            variant={general.dayView === "month" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "month" }))
            }
          >
            Month
          </Button>{" "}
        </Grid>
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth="12px"
            variant={general.dayView === "year" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "year" }))
            }
          >
            Year
          </Button>{" "}
        </Grid>
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth="12px"
            variant={general.dayView === "future" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "future" }))
            }
          >
            Future
          </Button>{" "}
        </Grid>{" "}
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            size="small"
            fullWidth="12px"
            variant={general.dayView === "all" ? "contained" : "outlined"}
            onClick={() => dispatch(selectView({ ...general, dayView: "all" }))}
          >
            All
          </Button>{" "}
        </Grid>
        <Grid item xs={2} sm={2} md={1.5}>
          <Button
            variant="contained"
            color="success"
            fullWidth="12px"
            px={0}
            onClick={() => {
              handleAddNewTodo();
            }}
          >
            Add todo
          </Button>
        </Grid>
        <Hidden only={[ "md", "lg", "xl"]}>
          <Grid item xs={2} sm={2} md={1.5}>
            <Button
              variant="contained"
              color="info"
              fullWidth="12px"
              onClick={() => {
                setProgressView(!progressView);
              }}
            >
              {!progressView ? "See" : "Hide"} Progress
            </Button>
          </Grid>
        </Hidden>
        <Grid container></Grid>
        <AddGoal open={open} setOpen={setOpen} />
      </Grid>
    </div>
  );
};

export default NavbarButtons;
