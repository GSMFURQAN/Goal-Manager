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
import AddGoal from "../common/AddGoal";
import LinearTimer from "../../utilities/LinearTimer";
import MyCards from "./MyCards";
import MyMobileCard from "./MyMobileCard";

const MyCard = () => {
  const general = useSelector((state) => state.general);
  const { category } = useSelector((state) => state.tab);
  const { data, loading, error } = useSelector((state) => state.goal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData({ dayView: general?.dayView }));
  }, [general.dayView, category]);

  return (
    <Stack
      sx={{
        width: { lg: "100%", xs: "100%" },
        border: "2px solid gray",
        borderRadius: "12px",
        margin: "8px 0px",
      }}
    >
      <Stack my={1} px={1} sx={{ overflowY: "auto", maxHeight: "64vh" }}>
        {loading ? (
          <Stack m={"auto"}>
            <CircularProgress />
          </Stack>
        ) : (
          data
            ?.filter((x) => x?.parentId == "" && x.category?.id == category?.id)
            .map((todo) => (
              <>
                <MyMobileCard todo={todo} />
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
                      <MyMobileCard todo={z} />
                    </Stack>
                  ))}
              </>
            ))
        )}
      </Stack>
      <AddGoal id={general.id} />
    </Stack>
  );
};

export default MyCard;
