import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, getTodos, updateTodo } from "../../Apis/Apis";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { fetchData } from "../../redux/goalSlice";
import { getProgress, selectSnack, selectView } from "../../redux/generalSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../imageFolder/MediaUploader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddGoal = ({ open, setOpen, id, selectedDate }) => {
  const general = useSelector((state) => state.general);
  const { data, loading, error } = useSelector((state) => state.goal);
  const [parentDate, setParentDate] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(false)
  const userData = JSON.parse(sessionStorage.getItem('account'))

  const [goalData, setGoalData] = React.useState({
    title: "",
    note: "",
    dueDate: '',
    subTasks: [],
    major: false,
    image: "",
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (general.action == "edit") {
      fetchIdData();
    }
  }, [id, dispatch]);
  React.useEffect(() => {
    setGoalData({...goalData, dueDate: selectedDate ? dayjs(selectedDate) : dayjs()})
  }, [id, dispatch, selectedDate]);

  const handleFileUpload = async (file) => {
    setFileUploadProgress(true)
    try {
      const downloadURL = await uploadFile(file);
      console.log("File uploaded successfully:", downloadURL);
      downloadURL && setGoalData({ ...goalData, image: downloadURL });
      setFileUploadProgress(false)
      // You can now use the downloadURL, e.g., set it in your state or send it to your backend
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const fetchIdData = async () => {
    await getTodos({ id: id }).then((res) => {
      setGoalData({
        ...res.data[0],
        dueDate: dayjs(res?.data[0]?.dueDate),
        // major: res.data[0]?.major
      });
      setParentDate(res?.data[0]?.dueDate);
    });
  };

  const handleAdd = async () => {
    const days = moment(
      id && goalData.dueDate.$d ? goalData.dueDate.$d : goalData.dueDate
    ).diff(moment(), "days");
    const goalView =
      days < 1 ? "day" : days < 32 ? "month" : days < 366 ? "year" : "future";

    //   const formData = new FormData();
    //   formData.append('title', goalData.title);
    //   formData.append('note', goalData.note);
    //   formData.append('dueDate', goalData.dueDate);
    //   formData.append('done', false);
    //   formData.append('dayView', goalView);
    //   formData.append('parentIdviewed', '');
    //   formData.append('viewed', 'NO');
    //   formData.append('major', goalData.major || false);
    //   formData.append('image', goalData.image);
    //  id && formData.append('_id', id) ;
    const payload = {
      title: goalData.title,
      note: goalData.note,
      dueDate: goalData.dueDate,
      done: false,
      dayView: goalView,
      parentId: "",
      viewed: "NO",
      major: goalData.major,
      image: goalData.image,
      userId: userData?.userId
    };
    if (
      general.action == "subTask" &&
      moment(goalData.dueDate).toISOString() > general.dueDate
    ) {
      dispatch(
        selectSnack({
          severity: "error",
          message: "selcted date must be less than parent",
          open: true,
        })
      );
    } else if (general.action == "edit") {
      await updateTodo({ ...payload, _id: id }).then(async () => {
        dispatch(fetchData({ dayView: general.dayView }));
        dispatch(selectView({ ...general, id: "", action: "" }));
      });
      setOpen(false);
    } else if (general.action == "subTask") {
      await addNewTodo({ ...payload, parentId: id, subTask: true }).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
        dispatch(selectView({ ...general, id: "", action: "" }));
      });
      setOpen(false);
    } else {
      await addNewTodo(payload).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
      });
      setOpen(false);
    }
    setGoalData({});
    dispatch(getProgress({ dayView: general.dayView }));
  };

  useEffect(() => {
    return () => {};
  }, [dispatch]);
  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          dispatch(selectView({ ...general, id: "", action: "" }));
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
                    sx={{ py: "12px" }}
                    value={goalData.dueDate}
                    onChange={(newValue) =>
                      setGoalData({ ...goalData, dueDate: newValue.$d })
                    }
                  />
                  <Stack
                    display={"flex"}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      // sx={{ width:'70%', paddingLeft:'12px' }}
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Image
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    <Box display={"flex"}>
                      <Typography my={"auto"}>Major Goal</Typography>
                      <Switch
                        checked={goalData.major}
                        onChange={() =>
                          setGoalData({ ...goalData, major: !goalData.major })
                        }
                      />
                    </Box>
                  </Stack>
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
                      dispatch(selectView({ ...general, id: "", action: "" }));
                      setGoalData({});
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
                    {!fileUploadProgress ? "Add" : "image uploading..."}
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
