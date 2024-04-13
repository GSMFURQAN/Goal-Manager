import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, getTodos, updateTodo } from "../Apis";
import dayjs from "dayjs";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { fetchData } from "../redux/goalSlice";
import { getProgress, selectSnack, selectView } from "../redux/generalSlice";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddGoal = ({ open, setOpen, id,  }) => {
  const general = useSelector((state) => state.general);
  const { data, loading, error } = useSelector((state) => state.goal);
const [parentDate, setParentDate] = useState('')
  const [goalData, setGoalData] = React.useState({
    title: "",
    note: "",
    dueDate: "",
    subTasks: [],
  });


  const dispatch = useDispatch();

  React.useEffect(() => {
    if(general.action == 'edit'){

      fetchIdData();
    }
    
  }, [id, dispatch]);

  const fetchIdData = async () => {
    await getTodos({ id: id }).then((res) => {
      
       setGoalData({
        ...res.data[0],
        dueDate: dayjs(res.data[0].dueDate),
      });
      setParentDate(res.data[0].dueDate)
    });
  };

  const handleAdd = async () => {
    const days = moment(id && goalData.dueDate.$d ? goalData.dueDate.$d : goalData.dueDate).diff(
      moment(),
      "days"
      );
    const goalView =
      days < 1
        ? "daily"
        : days < 8
        ? "weekly"
        : days < 32
        ? "monthly"
        : days < 366
        ? "yearly"
        : "future";
    const payload = {
      title: goalData.title,
      note: goalData.note,
      dueDate:  goalData.dueDate,
      done: false,
      dayView: goalView,
      parentId:''
    };
    // console.log('ddd',moment( payload.dueDate).diff(parentDate, 'hours') >1)
    if(general.action =='subTask' && moment( payload.dueDate).diff(parentDate, 'hours') > 1){
dispatch(selectSnack({severity:'error',message:'selcted date must be less than parent',open:true}))
    }else if (general.action == 'edit') {
      await updateTodo({ ...payload, _id: id }).then(async () => {
        dispatch(fetchData({ dayView: general.dayView }));
        dispatch(selectView({ ...general, id: "", action: '' }));
      });
      setOpen(false);
    } else if ( general.action =='subTask') {
      await  addNewTodo({...payload, parentId:id , subTask:true}).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
        dispatch(selectView({ ...general, id: "", action: '' }));
      });    
      setOpen(false);
    } else {
      await addNewTodo(payload).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
      });
      setOpen(false);
    }
    setGoalData({})
    dispatch(getProgress({dayView: general.dayView}))
  };

  useEffect(()=>{
    return ()=>{}
  },[dispatch])
  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          dispatch(selectView({ ...general, id: "", action: '' }));
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem label={"Add Goal"}>
                <Stack display={"flex"} direction={"column"} spacing={2}>
                  <TextField
                    label="Title"
                    type="text"
                    value={goalData.title}
                    onChange={(e) =>
                      setGoalData({ ...goalData, title: e.target.value })
                    }
                  />
                  <TextField
                    multiline
                    label="note"
                    type="text"
                    value={goalData.note}
                    onChange={(e) =>
                      setGoalData({ ...goalData, note: e.target.value })
                    }
                  />

                  <MobileDateTimePicker
                    label="Due Date"
                    sx={{ padding: "12px" }}
                    value={goalData.dueDate}
                    onChange={(newValue) =>
                      setGoalData({ ...goalData, dueDate: newValue.$d })
                    }
                  />
                </Stack>

                <Stack
                  pt={2}
                  display={"flex"}
                  direction={"row"}
                  alignSelf={"flex-end"}
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpen(false);
                      dispatch(
                        selectView({ ...general, id: "", action: '' })
                      );
                      setGoalData({})
                    }}
                    color="error"
                  >
                    Close
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleAdd()}
                    color="primary"
                  >
                    Add
                  </Button>
                </Stack>
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>{" "}
        </Box>
      </Modal>
    </div>
  );
};

export default AddGoal;
