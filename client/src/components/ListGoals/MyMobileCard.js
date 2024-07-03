import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/goalSlice";
import { selectView } from "../../redux/generalSlice";
import { deleteTodo, updateTodo } from "../../Apis/Apis";
import { showTime } from "../../utilities/utils";
import LinearTimer from "../../utilities/LinearTimer";
import { getProgress } from "../../redux/donutSlice";
import ImageGrid from "../common/ImageGrid";

const MyMobileCard = ({ todo}) => {
  const general = useSelector((state)=>state.general)
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = React.useState();
  const handleEditTodo = async (id) => {
    dispatch(
      selectView({ ...general, id: id, action: "edit", addGoalOpen: true })
    );
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id).then(() => {
      dispatch(fetchData({ dayView: general.dayView }));
      dispatch(getProgress({ dayView: general.dayView }));
    });
  };
  const handleChangeDone = async (id, done) => {
    await updateTodo({ _id: id, done: !done }).then(() => {
      dispatch(fetchData({ dayView: general.dayView }));
      dispatch(getProgress({ dayView: general.dayView }));
    });
  };
  const handleAddNewTodo = () => {
    dispatch(
      selectView({
        ...general,
        addGoalOpen: true,
        id: todo._id,
        dueDate: todo.dueDate,
        action: "subTask",
      })
    );
  };

  return (
    <div>
      <Divider />
      <Stack
        sx={{ maxHeight: "400px", overflow: "auto" }}
        key={todo._id}
        borderRadius={4}
        mx={1}
        //   px={2}
        onMouseOver={() => setSelectedId(todo._id)}
        onMouseLeave={() => setSelectedId(todo._id)}
      >
        <Stack>
          <Stack
            display={"flex"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} display={"flex"} ml={-1}>
              <Checkbox
                size="small"
                checked={todo.done}
                onChange={() => handleChangeDone(todo._id, todo.done)}
              />
              <Typography
                my={"auto"}
                style={{
                  textDecoration: todo.done ? "line-through" : "capitalize",
                }}
                variant="h6"
                fontSize={"16px"}
                color={`${
                  todo.done
                    ? "green"
                    : moment(todo.dueDate).diff(moment(), "hours") <= 0
                    ? "red"
                    : "cyan"
                }`}
              >
                {todo.title}
              </Typography>
            </Stack>
            <Typography
              my={"auto"}
              maxWidth={{ xs: 100, sm: 200 }}
              fontSize={14}
            >
              {/* <Typography
                  fontWeight={"bold"}
                  display={"inline-block"}
                  fontSize={"12px"}
my={'auto'}                >
                  Due Date : &nbsp;
                </Typography>{" "} */}
              {moment(todo.dueDate).format("DD MMMM YYYY , hh:mm a")}
            </Typography>
          </Stack>
          {/* <Divider /> */}

          <Stack
            // width={{ xl: 600, lg: 520, md: 520, sm: 400, xs: 300 }}
            mt={0.5}
            pr={3}
          direction={'row'}
          justifyContent={'space-between'}
          >
            <Typography
              fontWeight={"bold"}
              display={"inline-block"}
              fontSize={"14px"}
              mb={0.5}
            >
              Note : &nbsp; {todo.note}
            </Typography>{" "}
            {/* <Timer daysLeft={moment(todo.dueDate).diff(moment(), "days")}/> */}
           {todo.docs.length > 0 && <Badge badgeContent={`+ ${todo.docs.length -1}`} color="primary">
              <img
              style={{borderRadius:'12px'}}
                src={todo.docs[0]}
                width={"40rem"}
                height={"40rem"}
                alt="doc"
                onClick={()=>dispatch(selectView({...general, imageGridModal : true}))}
              />
            </Badge>}
          </Stack>
          <Stack
            display={"flex"}
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent={"space-between"}
            fontSize={"14px"}
          >
            <Stack display={"flex"} direction={"column"} width={"65%"}>
              <Typography variant="body3">
                <Typography
                  fontWeight={"bold"}
                  display={"inline-block"}
                  fontSize={"14px"}
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
            <Stack
              display={"flex"}
              direction={"row"}
              spacing={{ xs: 2, sm: 0.5 }}
            >
              {!todo.parentId && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleAddNewTodo()}
                  sx={{ fontSize: "13px" }}
                >
                  sub tasks
                </Button>
              )}
              <Button
                variant="text"
                size="small"
                onClick={() => handleEditTodo(todo._id)}
                sx={{ fontSize: "13px" }}
              >
                Edit
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => handleDeleteTodo(todo._id)}
                sx={{ fontSize: "13px" }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <ImageGrid media={todo.docs} />
      </Stack>
    </div>
  );
};

export default MyMobileCard;
