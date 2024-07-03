import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Modal, Stack, Typography } from "@mui/material";
import { addNewTodo, deleteTodo, updateTodo } from "../../Apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import AddGoal from "../common/AddGoal";
import { fetchData } from "../../redux/goalSlice";

export default function SearchBar({ time }) {
  const [editTodo, setEditTodo] = React.useState({ id: "", name: "" });
  const [open, setOpen] = React.useState(false);
  const [searchtxt, setSearchtxt] = React.useState('');
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.goal);
  const { dayView } = useSelector((state) => state.general);
  

  const handleAddNewTodo = () => {
    setOpen(true);
  };
  
  React.useEffect(()=>{
    dispatch(fetchData({searchtxt:searchtxt, dayView:dayView}))
  },[searchtxt])

  return (
    <Stack
      display={"flex"}
      direction={"row"}
      justifyContent={"space-around"}
      p={1}
    >
      <TextField
      size="small"
        label="search your Goals"
        value={searchtxt}
        sx={{ width: "72%" }}
        onChange={(e) => {setSearchtxt(e.target.value)}}
      />
      

    </Stack>
  );
}
