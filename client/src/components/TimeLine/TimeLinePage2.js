import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Stack,
} from "@mui/material";
import { fireConfetti } from "./confetti";
import ScrollToBottom from "./ScrollToBottom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/goalSlice";
import moment from "moment";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function TimeLinePage2() {
  const dispatch = useDispatch();
  const [achievements, setachievements] = React.useState([
    {
      title: "Land",
      subTitle: "Mulamattam",
      note: "36 Lacs, Loan onGoing",
      date: "2-03-2021",
    },
    {
      title: "Scooty",
      subTitle: "Jupiter125",
      note: "1.25 Lacs",
      date: "2-08-2022",
    },
    {
      title: "Car",
      subTitle: "Honda city, 2019 Feb Made, 49,000 Km ",
      note: " 7.25 Lacs",
      date: "21S-10-2023",
    },
    {
      title: "Scooty",
      subTitle: "Jupiter125",
      note: "1.25 Lacs",
      date: "2-03-2023",
    },
    {
      title: "Land",
      subTitle: "Mulamattam",
      note: "36 Lacs",
      date: "2-03-2023",
    },
    {
      title: "Scooty",
      subTitle: "Jupiter125",
      note: "1.25 Lacs",
      date: "2-03-2023",
    },
    {
      title: "Land",
      subTitle: "Mulamattam",
      note: "36 Lacs",
      date: "2-03-2023",
    },
    {
      title: "Scooty",
      subTitle: "Jupiter125",
      note: "1.25 Lacs",
      date: "2-03-2023",
    },
  ]);
  const goal = useSelector((state) => state.goal.data);

  React.useEffect(() => {
    dispatch(fetchData({ major: true }));
  }, []);

  console.log("sde", goal);
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <>
      <Timeline position="alternate">
        {goal?.map((x, i) => (
          <TimelineItem sx={{ padding: "0 14%" }}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {moment(x.dueDate).format("DD MMMM, YYYY")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <AutoAwesomeIcon/>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent p={2}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140px"
                    image={x?.image ? apiUrl + "/" + x.image : ''}
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
    </>
  );
}
