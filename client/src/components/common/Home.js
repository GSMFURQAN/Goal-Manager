import * as React from "react";
import { Alert, Snackbar, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSnack } from "../../redux/generalSlice";
import MyList from "../ListGoals/MyList";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import NavbarButtons2 from "../ListGoals/NavbarButtons2";
import PieChartData from "../PieChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home({ progressView, setProgressView }) {
  const snack = useSelector((state) => state.snack);
  const navigate = useNavigate();
  let account = JSON.parse(sessionStorage.getItem("account"));

  React.useEffect(() => {
    if (!account) {
      navigate("login");
    }
  }, []);

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(selectSnack({ ...snack, open: false }));
  };

  return (
    <>
      <Stack
        sx={{
          width: "94%",
        }}
        pt={2}
        m={"auto"}
      >
        {/* <SearchBar /> */}
        <Stack
          display={"flex"}
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          }}
        >
          <NavbarButtons2 />
          <MyList />
          <PieChartData />
        </Stack>
        <Snackbar
          open={snack.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={snack.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.message}{" "}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
