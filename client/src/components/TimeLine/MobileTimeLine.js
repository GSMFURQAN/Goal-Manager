import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/goalSlice";
import moment from "moment";
import ScrollToBottom from "./ScrollToBottom";
import { fireConfetti } from "./confetti";

function MobileTimeLine() {
  const dispatch = useDispatch();

  const goal = useSelector((state) => state.goal.data);

  React.useEffect(() => {
    dispatch(fetchData({ major: true }));
  }, []);
  return (
    <div>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {goal?.map((x) => (
          <TimelineItem key={x._id} >
            <TimelineOppositeContent color="textSecondary" sx={{margin:'auto'}}>
              {moment(x.dueDate).format("DD MMMM, YYYY")}
            </TimelineOppositeContent>
            <TimelineSeparator >
              <TimelineConnector />
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{margin:"8px 0px",}}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="90px"
                    image={x.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Stack
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems="center"
                      direction={"column"}
                    >
                      <Typography variant="h5" component="div">
                        {x.title}
                      </Typography>

                      <br />
                      <Stack>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          // sx={{ display: "block" }}
                          pl={"0px"}
                        >
                          {x.note}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
                <ScrollToBottom onScrollToBottom={() => fireConfetti()} />{" "}

      </Timeline>
    </div>
  );
}

export default MobileTimeLine;
