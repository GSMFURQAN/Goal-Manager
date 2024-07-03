import { Box, Button, Grid, Hidden, IconButton, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../redux/generalSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddGoal from "../common/AddGoal";
import { getTodos } from "../../Apis/Apis";
const NavbarButtons2 = ({ progressView, setProgressView }) => {
  const [open, setOpen] = React.useState(false);
const dispatch = useDispatch()
  const general = useSelector((state) => state.general);
  const handleAddNewTodo = () => {
    dispatch(selectView({...general, addGoalOpen:true}))
    setOpen(true);
  };

  return (
    <Stack display={{ sm: "none",xs:"none",md:'none', lg: "flex"}} direction={'column'} spacing={4} my={4} mr={4}>
   
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
       
          <Button
            size="small"
            variant={general.dayView === "day" ? "contained" : "outlined"}
            onClick={() => dispatch(selectView({ ...general, dayView: "day" }))}
          >
            Today
          </Button>{" "}
   
          <Button
            size="small"
            variant={general.dayView === "tomorrow" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "tomorrow" }))
            }
          >
            Tomorrow
          </Button>{" "}
       
          <Button
            size="small"
            variant={general.dayView === "future" ? "contained" : "outlined"}
            onClick={() =>
              dispatch(selectView({ ...general, dayView: "future" }))
            }
          >
            Future
          </Button>{" "}
  
          <Button
            size="small"
            variant={general.dayView === "all" ? "contained" : "outlined"}
            onClick={() => dispatch(selectView({ ...general, dayView: "all" }))}
            >
            All
            </Button>
            <Hidden only={[ "md", "lg", "xl"]}>
          <Button
            size="small"
            variant="contained"
            color="success"
             px={0}
            onClick={() => {
              handleAddNewTodo();
            }}
          >
            Add Goal
          </Button>
            <Button
              variant="contained"
              color="info"
                 onClick={() => {
                setProgressView(!progressView);
              }}
            >
              {!progressView ? "See" : "Hide"} Progress
            </Button>
        </Hidden>
        <AddGoal open={open} setOpen={setOpen} />
    </Stack>
  );
};

export default NavbarButtons2;
