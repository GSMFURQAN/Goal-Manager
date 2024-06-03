import React, { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/goalSlice.js";
import AddGoal from "../ListGoals/AddGoal.js";

function CalendarPage() {
  // const allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const general = useSelector((state) => state.general);
  const [eventData, setEventData] = useState([]);
  const { data, loading, error } = useSelector((state) => state.goal || []);
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [open, setOpen] = useState(false);

useEffect(()=>{
  let startDate =  moment(currentDate, 'ddd MMM DD YYYY HH:mm:ss [GMT] Z').startOf(currentView === 'month' ? 'month' :(currentView === 'week'? 'week':'day')).toDate();
  let endDate =   moment(currentDate, 'ddd MMM DD YYYY HH:mm:ss [GMT] Z').endOf(currentView === 'month' ? 'month' :(currentView === 'week'? 'week':'day')).toDate();
  dispatch(fetchData({startDate:startDate, endDate:endDate}))
  // let x =  moment(currentDate).startOf('month').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
},[currentDate,currentView])
useEffect(() => {
  setEventData(
    data
        ? data?.map((x) => ({
          title: x?.note,
            start: moment(x?.dueDate).toDate(),
            end: moment(x?.dueDate).toDate(),
          }))
          : []
    );
  }, [data]);
  
  const handleViewChange = (view) => {
    setCurrentView(view);
    // view !== "agenda" && dispatch(fetchData({...currentDate && {date:moment(currentDate).toString()}, dayView: view }));
  };
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setOpen(true);
  };
  
  return (
    <>
      <Stack mx={"10%"} mt={"3%"}>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          events={eventData}
          step={15}
          selectable
          views={["day","week", "month", "agenda"]}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelectSlot}
          onView={handleViewChange}
          defaultDate={new Date()}
          popup={false}
          // formats={bigCalFormats}
					timeslots={2}
          onNavigate={(newDate)=>setCurrentDate(newDate)}
          // onShowMore={(events, date) =>
          //   this.setState({ showModal: true, events })
          // }
        />
      </Stack>
      <AddGoal open={open} setOpen={setOpen} selectedDate={selectedDate}/>
    </>
  );
}

export default CalendarPage;
