import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddGoal from "./AddGoal";
import { Hidden, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../redux/generalSlice";

export default function SideDrawer({
  open,
  setOpen,
  progressView,
  setProgressView,
}) {
  const general = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const handleAddNewTodo = () => {
    dispatch(selectView({ ...general, addGoalOpen: true }));
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <Stack display={"flex"} direction={"column"} spacing={4} my={8} mx={5}>
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
          fullWidth="12px"
          variant={general.dayView === "day" ? "contained" : "outlined"}
          onClick={() => dispatch(selectView({ ...general, dayView: "day" }))}
        >
          Today
        </Button>{" "}
        <Button
          size="small"
          fullWidth="12px"
          variant={general.dayView === "tomorrow" ? "contained" : "outlined"}
          onClick={() =>
            dispatch(selectView({ ...general, dayView: "tomorrow" }))
          }
        >
          Tomorrow
        </Button>{" "}
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
        <Button
          size="small"
          fullWidth="12px"
          variant={general.dayView === "all" ? "contained" : "outlined"}
          onClick={() => dispatch(selectView({ ...general, dayView: "all" }))}
        >
          All
        </Button>
        <Hidden only={["md", "lg", "xl"]}>
          <Button
            size="small"
            variant="contained"
            color="success"
            fullWidth="12px"
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
            size="small"
            onClick={() => {
              dispatch(
                selectView({ ...general, progressOpen: !general.progressOpen })
              );
            }}
          >
            {!general.progressOpen ? "See" : "Hide"} Progress
          </Button>
        </Hidden>
        <AddGoal open={open} setOpen={setOpen} />
      </Stack>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
