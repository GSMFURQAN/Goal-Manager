import { Box, Button, IconButton, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectView } from '../../redux/generalSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddGoal from './AddGoal';
import { getTodos } from '../../Apis';
const Navbar = () => {
  const [open, setOpen] = React.useState(false);

    const general = useSelector((state) => state.general);
    const dispatch = useDispatch();
    const handleAddNewTodo = () => {
      setOpen(true);
    };
    React.useEffect( ()=>{
      getTodos({viewed:false }).then((res)=>console.log('nots',res?.data))  
  },[general.dayView])
  
  return (
    <div> <Stack
    display={"flex"}
    justifyContent={"space-around"}
    direction={"row"}
    py={1}
  >
    <Button
    size='small'
      variant={general.dayView === "previous" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "previous" }))
      }
    >
      Previous
    </Button>{" "}
    <Button
    size='small'
      variant={general.dayView === "day" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "day" }))
      }
    >
      Today
    </Button>{" "}
    {/* <Button
    size='small'
      variant={general.dayView === "weekly" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "weekly" }))
      }
    >
      Weekly
    </Button>{" "} */}
    <Button
    size='small'
      variant={general.dayView === "month" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "month" }))
      }
    >
      Month
    </Button>{" "}
    <Button
    size='small'
      variant={general.dayView === "year" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "year" }))
      }
    >
      Year
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
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "all" }))
      }
    >
      All
    </Button>{" "}
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

  </Stack></div>
  )
}

export default Navbar