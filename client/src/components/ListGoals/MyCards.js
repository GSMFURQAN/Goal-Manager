import {
  Box,
  Button,
  Checkbox,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/goalSlice";
import { getProgress, selectView } from "../../redux/generalSlice";
import { deleteTodo, updateTodo } from "../../Apis";
import { showTime } from "../../utilities/utils";
import LinearTimer from "../../utilities/LinearTimer";

const MyCards = ({ todo, general, open, setOpen }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = React.useState();

  const handleEditTodo = async (id) => {
    setOpen(true);
    dispatch(selectView({ ...general, id: id, action:'edit' }));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id).then(() => {
      dispatch(fetchData({ dayView: general.dayView }));
    });
  };
  const handleChangeDone = async (id, done) => {
    await updateTodo({ _id: id, done: !done }).then(() => {
      dispatch(fetchData({ dayView: general.dayView }));
      dispatch(getProgress({ dayView: general.dayView }));
    });
  };
  return (
    <div>
      <Stack
        border={`2px solid ${
          todo.done
            ? "green"
            : moment(todo.dueDate).diff(moment(), "hours") <= 0
            ? "red"
            : "cyan"
        }`}
        key={todo._id}
        width={"100%"}
        borderRadius={4}
        m={1}
        px={2}
        onMouseOver={() => setSelectedId(todo._id)}
        onMouseLeave={() => setSelectedId(todo._id)}
      >
        <Stack>
          <Stack
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} display={"flex"}>
              <Checkbox
              size="small"
                checked={todo.done}
                onChange={() => handleChangeDone(todo._id, todo.done)}
              />
              <Typography
                mt={1}
                sx={{
                  textDecoration: todo.done ? "line-through" : "capitalize",
                }}
                variant="h6"
                fontSize={"14px"}
              >
                {todo.title}
              </Typography>
            </Stack>
            <Typography variant="body2">
              <Typography
                fontWeight={"bold"}
                display={"inline-block"}
                fontSize={"12px"}
                py={1}
              >
                Due Date :
              </Typography>{" "}
              {moment(todo.dueDate).format("DD-MM-YYYY , hh:mm a")}
            </Typography>
          </Stack>
          <Divider />

          <Stack
            width={600}
            mt={0.5}
            sx={{
              maxHeight: selectedId === todo._id ? "100%" : 0,
              overflow: "hidden",
              // transition: "max-height 0.2s ease",
            }}
          >
            <Typography
              fontWeight={"bold"}
              display={"inline-block"}
              fontSize={"12px"}
              mb={0.5}
            >
              Note : &nbsp; {todo.note}
            </Typography>{" "}
            {/* <Timer daysLeft={moment(todo.dueDate).diff(moment(), "days")}/> */}
          </Stack>
          <Stack
            display={"flex"}
            direction={"row"}
            spacing={1}
            justifyContent={"space-between"}
            fontSize={"14px"}
          >
            <Stack display={"flex"} direction={"column"} width={"65%"}>
              <Typography variant="body3">
                <Typography
                  fontWeight={"bold"}
                  display={"inline-block"}
                  fontSize={"12px"}
                >
                  Time Left :
                </Typography>{" "}
                {showTime(todo.dueDate, general.dayView) == 0
                  ? "completed"
                  : showTime(todo.dueDate, general.dayView)}
              </Typography>
              {/* <Box>
                <LinearTimer
                  display={"block"}
                  style={{ width: "50%" }}
                  dayView={general.dayView}
                  daysLeft={moment(todo.dueDate).diff(
                    moment(),
                    general.dayView === "daily" ? "hours" : "days"
                  )}
                />
              </Box> */}
            </Stack>
            <Stack display={"flex"} direction={"row"} spacing={0.5}>
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setOpen(true);
                  dispatch(
                    selectView({
                      ...general,
                      id: todo._id,
                      action: 'subTask',
                    })
                  );
                }}
                sx={{ fontSize: "11px" }}
              >
                sub tasks
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => handleEditTodo(todo._id)}
                sx={{ fontSize: "11px" }}
              >
                Edit
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => handleDeleteTodo(todo._id)}
                sx={{ fontSize: "11px" }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default MyCards;
