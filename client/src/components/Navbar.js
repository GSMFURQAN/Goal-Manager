import { Box, Button, IconButton, Stack } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectView } from '../redux/generalSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const Navbar = () => {
    const general = useSelector((state) => state.general);
    const dispatch = useDispatch();
  return (
    <div> <Stack
    display={"flex"}
    justifyContent={"space-around"}
    direction={"row"}
    py={2}
  >
    <Button
    size='small'
      variant={general.dayView === "daily" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "daily" }))
      }
    >
      Daily
    </Button>{" "}
    <Button
    size='small'
      variant={general.dayView === "weekly" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "weekly" }))
      }
    >
      Weekly
    </Button>{" "}
    <Button
    size='small'
      variant={general.dayView === "monthly" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "monthly" }))
      }
    >
      Monthly
    </Button>{" "}
    <Button
    size='small'
      variant={general.dayView === "yearly" ? "contained" : "outlined"}
      onClick={() =>
        dispatch(selectView({ ...general, dayView: "yearly" }))
      }
    >
      Yearly
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
    <Box
sx={{
 
 
  bgcolor: 'background.default',
  color: 'text.primary',
  borderRadius: 1,
}}
>
<IconButton sx={{ ml: 1 }} onClick={()=>dispatch(selectView({...general, theme: !general.theme}))} color="inherit">
  {general.theme ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
</Box>
  </Stack></div>
  )
}

export default Navbar