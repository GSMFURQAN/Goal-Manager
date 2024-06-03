import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { register } from "../Apis/AuthApis";

export default function Signup() {
  const navigate = useNavigate();
  const searchString = window.location.href;
  const editUser = searchString.includes("editUser");
  const { id } = useParams();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const handleClick = () => {
    register(details)
      .then((res) => {
        setOpenSnack({
          ...openSnack,
          open: true,
          message: 'user registered succesfully',
          severity: "success",
        });
        setTimeout(() => {
          navigate('/login')
        }, 2000); 
      })
      .catch((error) => {
        setOpenSnack({
          ...openSnack,
          open: true,
          message: error.response.data.error,
          severity: "error",
        });
      });
  };

  return (
    <>
      <Stack direction={"column"} mx={"38%"} mt={8}>
        <Typography variant="h5" fontWeight={"bold"} m={"auto"}>
          Register
        </Typography>
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="name"
          label="Name"
          variant="outlined"
          value={details.name}
          onChange={(event) =>
            setDetails({ ...details, [event.target.name]: event.target.value })
          }
        />
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="email"
          label="Email"
          variant="outlined"
          value={details.email}
          onChange={(event) =>
            setDetails({ ...details, [event.target.name]: event.target.value })
          }
        />
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="password"
          label="password"
          variant="outlined"
          value={details.password}
          onChange={(event) =>
            setDetails({ ...details, [event.target.name]: event.target.value })
          }
        />
        {/* <TextField size='sm' sx={{width:'360px', marginTop:'18px'}} name='userName' label="User Name" variant="outlined" value={details.userName} onChange={(event)=> setDetails({...details, [event.target.name] : event.target.value})} /> */}
        <Button
          variant="contained"
          sx={{ width: "200px", marginLeft: "76px", marginTop: "34px" }}
          size="md"
          onClick={() => handleClick()}
        >
          Signup
        </Button>
        <Snackbar
          open={openSnack.open}
          autoHideDuration={3000}
          onClose={() => setOpenSnack({ ...openSnack, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnack({ ...openSnack, open: false })}
            severity={openSnack.severity}
            sx={{ width: "100%" }}
          >
            {openSnack.message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
