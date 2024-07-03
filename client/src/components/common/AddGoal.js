import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
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
import {
  addNewTodo,
  getPreferences,
  getTodos,
  updateTodo,
} from "../../Apis/Apis";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { fetchData } from "../../redux/goalSlice";
import { selectSnack, selectView } from "../../redux/generalSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../imageFolder/MediaUploader";
import { getProgress } from "../../redux/donutSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: "40vw", xs: "85vw" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius:'12px',
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

const AddGoal = ({ id, selectedDate }) => {
  const general = useSelector((state) => state.general);
  const { data, loading, error } = useSelector((state) => state.goal);
  const { category } = useSelector((state) => state.tab);
  const [parentDate, setParentDate] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  const [tabs, setTabs] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("account"));

  const [goalData, setGoalData] = React.useState({
    title: "",
    note: "",
    dueDate: "",
    subTasks: [],
    major: false,
    image: "",
    category: "",
    docs:[]
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (general.action == "edit") {
      fetchIdData();
    }
  }, [id, dispatch]);

  React.useEffect(() => {
    setGoalData({
      ...goalData,
      dueDate: selectedDate ? dayjs(selectedDate) : dayjs(),
    });
  }, [id, dispatch, selectedDate]);

  useEffect(() => {
    getPreferences(userData?.userId).then((res) => {
      let categories = res?.data[0]?.categories.sort((a, b) => a.id - b.id);
      setTabs(categories);
      //   categories.length >0 &&  upliftCategory(categories[value]?.id, categories[value]?.label)
    });
  }, []);

  useEffect(() => {
    setGoalData({ ...goalData, category: category.id });
  }, [category]);

  const handleFileUpload = async (file) => {
    setFileUploadProgress(true);
    try {
      const downloadURL = await uploadFile(file);
      console.log("File uploaded successfully:", downloadURL);
      downloadURL && setGoalData({ ...goalData, image: downloadURL });
      setFileUploadProgress(false);
      // You can now use the downloadURL, e.g., set it in your state or send it to your backend
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDocsUpload = async (file) => {
    setFileUploadProgress(true);
    try {
      const downloadURL = await uploadFile(file);
      console.log("File uploaded successfully:", downloadURL);
      downloadURL && setGoalData({ ...goalData, docs:[...goalData.docs, downloadURL] });
      setFileUploadProgress(false);
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
        category: res?.data[0]?.category?.id,

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
      userId: userData?.userId,
      category: tabs.filter((x) => x.id == goalData?.category)[0],
      docs: goalData.docs,
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
    } else if (general.action == "subTask") {
      await addNewTodo({ ...payload, parentId: id, subTask: true }).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
        dispatch(selectView({ ...general, id: "", action: "" }));
      });
    } else {
      await addNewTodo(payload).then(() => {
        dispatch(fetchData({ dayView: general.dayView }));
      });
    }
    !loading &&
      dispatch(
        selectView({ ...general, id: "", action: "", addGoalOpen: false })
      );
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
        open={general.addGoalOpen}
        onClose={() => {
          dispatch(
            selectView({ ...general, id: "", action: "", addGoalOpen: false })
          );
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DemoItem label={"Add Goal"}>
                <Stack display={"flex"} direction={"column"} spacing={2}>
                  <Select
                    size="small"
                    style={{ marginTop: "9px" , color:'inherit'}}
                    value={goalData.category}
                    label="Category"
                    onChange={(e) =>
                      setGoalData({ ...goalData, category: e.target.value })
                    }
                  >
                    {tabs.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    label="Title"
                    type="text"
                    size="small"
                    value={goalData.title}
                    onChange={(e) =>
                      setGoalData({ ...goalData, title: e.target.value })
                    }
                  />
                  <TextField
                    multiline
                    size="small"
                    label="Note"
                    type="text"
                    value={goalData.note}
                    onChange={(e) =>
                      setGoalData({ ...goalData, note: e.target.value })
                    }
                  />

                  <MobileDateTimePicker
                    label="Due Date"
                    size="small"
                    sx={{ py: "12px" }}
                    value={goalData.dueDate}
                    onChange={(newValue) =>
                      setGoalData({ ...goalData, dueDate: newValue.$d })
                    }
                  />
                  <Stack
                    display={"flex"}
                    direction={{lg:'row', md:'row', xs:'column'}}
                    spacing={{ xs: 2, lg: 8 }}
                    >
                   <Stack 
                    display={"flex"}
                    direction={'row'}>

                    <Button
                      size="small"
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      sx={{ fontSize: "12px" }}
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                      startIcon={<CloudUploadIcon />}
                      >
                      Cover Photo
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    <Box>{' '}</Box>
                    </Stack>
                  <Stack
                    display={"flex"}
                    direction={'row'}
                    spacing={2}
                  >
                    <Button
                      size="small"
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      sx={{ fontSize: "12px" }}
                      onChange={(e) => handleDocsUpload(e.target.files[0])}
                      startIcon={<CloudUploadIcon />}
                    >
                      documents
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    <Badge color="secondary" badgeContent=" ">
                      <Box
                        component="span"
                        sx={{ bgcolor: "primary.main", width: 40, height: 40 }}
                      ><img src="" alt="doc" /></Box>
                    </Badge>
                  </Stack>
                  </Stack>
                </Stack>
                <Box display={"flex"}>
                  <Typography my={"auto"}>Major Goal</Typography>
                  <Switch
                    checked={goalData.major}
                    onChange={() =>
                      setGoalData({ ...goalData, major: !goalData.major })
                    }
                  />
                </Box>
                {/* </Stack> */}

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
                      dispatch(
                        selectView({
                          ...general,
                          id: "",
                          action: "",
                          addGoalOpen: false,
                        })
                      );
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
