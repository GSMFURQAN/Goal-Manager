import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" component="div" color="text.secondary">
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function Timer({ daysLeft }) {
  console.log("dde", daysLeft);
  const [progress, setProgress] = React.useState(daysLeft + 0);

  React.useEffect(() => {
    setProgress((prevProgress) =>
      prevProgress >= daysLeft + 0 ? 0 : daysLeft + 0
    );
  }, [daysLeft]);

  return (
    <Stack direction={"row"} display={"flex"} my={1}>
      <Typography variant="body2" p={2}>Days Left :</Typography>
      <CircularProgressWithLabel
        sx={{ marginTop: "4px" }}
        value={progress}
        size={"3.5rem"}
      />
    </Stack>
  );
}
