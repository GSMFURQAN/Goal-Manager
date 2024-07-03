import {
  Alert,
  Box,
  Button,
  CircularProgress,
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("account")) {
      navigate("/");
    }
  }, []);
  const handleClick = () => {
    setLoading(true);
    loginUser(details).then((res) => {
      if (res?.data?.status == 201) {
        setOpenSnack({
          ...openSnack,
          open: true,
          message: "Login successful",
          severity: "success",
        });
        setLoading(false);
        sessionStorage.setItem("account", JSON.stringify(res?.data?.userData));
        window.location.reload();
        navigate("/");
      } else {
        setOpenSnack({
          ...openSnack,
          open: true,
          message: res?.response?.data?.error || "Login Failed",
          severity: "error",
        });
        setLoading(false);
      }
    });
  };

  return (
    <Box border={1} borderRadius={6} width={{xs:'80%',md:'460px', lg:'460px'}} boxShadow={4} m={'auto'} my={4} p={{xs:1, lg:4,md:4}}>
      <Stack display="flex" direction={"column"} alignItems={"center"} mt={4}>
        <Typography variant="h5" fontWeight={"bold"} m={"auto"}>
          Login{" "}
        </Typography>
        <TextField
          size="sm"
          sx={{ width: {xs:'80%',md:'360px', lg:'360px'}, marginTop: "18px" }}
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
          sx={{ width: {xs:'80%',md:'360px', lg:'360px'}, marginTop: "18px" }}
          name="password"
          label="password"
          variant="outlined"
          value={details.password}
          onChange={(event) =>
            setDetails({ ...details, [event.target.name]: event.target.value })
          }
        />
        {loading ? (
          <CircularProgress  sx={{margin:'12px'}}/>
        ) : (
          <Button
            variant="contained"
            sx={{ width: {xs:'60%',md:'180px', lg:'180px'}, marginTop: "34px" }}
            size="md"
            onClick={() => handleClick()}
          >
            Login
          </Button>
        )}
        <br />
        <Button variant="text" onClick={() => navigate("/signup")}>
          New User ?
        </Button>
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
    </Box>
  );
}
