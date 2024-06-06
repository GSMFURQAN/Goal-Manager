import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../Apis/AuthApis";

export default function Login() {
  const navigate = useNavigate();
  const searchString = window.location.href;
  const editUser = searchString.includes("editUser");
  const { id } = useParams();
  const [details, setDetails] = useState({
    email: "",
    password: null,
  });

  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("account")) {
      navigate("/");
    }
  }, []);
  const handleClick = () => {
    loginUser(details)
      .then((res) => {
        if (res?.data?.status == 201) {
          setOpenSnack({
            ...openSnack,
            open: true,
            message: 'Login successful',
            severity: "success",
          });
          sessionStorage.setItem('account',JSON.stringify(res?.data?.userData))
          window.location.reload()
          navigate('/')
        }else{
          setOpenSnack({
            ...openSnack,
            open: true,
            message: res?.response?.data?.error,
            severity: "error",
          });
        
        }
      })
  }
    
  return (
    <div>
      <Stack display='flex' direction={"column"} alignItems={'center'} mt={8}>
        <Typography variant="h5" fontWeight={"bold"} m={"auto"}>
          Login
        </Typography>
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
        <Button
          variant="contained"
          sx={{ width: "200px", marginTop: "34px" }}
          size="md"
          onClick={() => handleClick()}
        >
          Login
        </Button>
        <br/>
        <Button  variant="text" onClick={()=>navigate('/signup')}>New User ?</Button>
      </Stack>
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
    </div>
  );
}
