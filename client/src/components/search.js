import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Modal, Stack, Typography } from "@mui/material";
import { addNewTodo, deleteTodo, updateTodo } from "../Apis";
import { useDispatch, useSelector } from "react-redux";
import AddGoal from "./AddGoal";

export default function SearchBar({ time }) {
  const [editTodo, setEditTodo] = React.useState({ id: "", name: "" });
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { title, note, dueDate, done } = useSelector((state) => state.goal);
  const { dayView } = useSelector((state) => state.general);
  

  const handleAddNewTodo = () => {
    setOpen(true);
  };
 

  return (
    <Stack
      display={"flex"}
      direction={"row"}
      justifyContent={"space-around"}
      p={1}
    >
      <TextField
      size="small"
        label="search todos"
        value={title}
        sx={{ width: "72%" }}
        onChange={(e) => {}}
      />
      <Button
        variant="contained"
        px={0}
        onClick={() => {
          handleAddNewTodo();
        }}
      >
        Add todo
      </Button>
      <AddGoal open={open} setOpen={setOpen} />

    </Stack>
  );
}
