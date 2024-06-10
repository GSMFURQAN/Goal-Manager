import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { showTime } from "../../utilities/utils";
import { fetchData, updateGoal } from "../../redux/goalSlice";
import { deleteTodo, updateTodo } from "../../Apis/Apis";
import Timer from "../../utilities/Timer";
import { useDispatch, useSelector } from "react-redux";
import { getProgress, selectView } from "../../redux/generalSlice";
import AddGoal from "./AddGoal";
import LinearTimer from "../../utilities/LinearTimer";
import MyCards from "./MyCards";
import MyMobileCard from "./MyMobileCard";

const MyCard = () => {
  const [open, setOpen] = React.useState(false);
  const general = useSelector((state) => state.general);
  const { data, loading, error } = useSelector((state) => state.goal);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchData({ dayView: general?.dayView}));
  }, [ general.dayView]);

  return (
    <Stack sx={{ width: {lg:"75%", xs:'100%'} , border:'2px solid gray', borderRadius:'12px', margin:'8px 0px'}}>
      <Stack my={1} px={1} sx={{ overflowY: "auto", maxHeight: '64vh' }}>
        {!data ? (
          <Stack m={'auto'}>
          <CircularProgress />
            </Stack> 
        ) : (
          data
            .filter((x) => x.parentId == "")
            .map((todo) => (
              <>
                <MyMobileCard
                  todo={todo}
                  general={general}
                  open={open}
                  setOpen={setOpen}
                />
                {/* ------------------------------------------------------------------------------- */}
                {data
                  .filter((x) => x.parentId == todo._id)
                  .map((z) => (
                    <Stack
                      display={"flex"}
                      direction={"row"}
                      justifyContent={"space-between"}
                    >
                      <Stack width={"15%"}>
                        <Divider
                          orientation="vertical"
                          sx={{ borderRight: "3px solid gray" }}
                        />
                      </Stack>
                      <Box
                        border={"1px solid gray"}
                        height={0}
                        width={"20%"}
                        my={"60px"}
                      />
                      <MyMobileCard
                        todo={z}
                        general={general}
                        open={open}
                        setOpen={setOpen}
                      />
                    </Stack>
                  ))}
              </>
            ))
        )}
      </Stack>
      <AddGoal open={open} setOpen={setOpen} id={general.id} />
    </Stack>
  );
};

export default MyCard;
