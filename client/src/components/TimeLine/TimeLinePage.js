import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function TimeLinePage() {
  const [achievements, setachievements] = useState([
    { title: "Land", subTitle: "Mulamattam", note: "36 Lacs" },
    { title: "Scooty", subTitle: "Jupiter125", note: "1.25 Lacs" },
    { title: "Land", subTitle: "Mulamattam", note: "36 Lacs" },
    { title: "Scooty", subTitle: "Jupiter125", note: "1.25 Lacs" },
    { title: "Land", subTitle: "Mulamattam", note: "36 Lacs" },
    { title: "Scooty", subTitle: "Jupiter125", note: "1.25 Lacs" },
    { title: "Land", subTitle: "Mulamattam", note: "36 Lacs" },
    { title: "Scooty", subTitle: "Jupiter125", note: "1.25 Lacs" },
  ]);
  return (
    <div style={{ margin: "0px 220px" }}>
      <VerticalTimeline>
        {achievements.map((x) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="2011 - present"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">{x.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{x.subTitle}</h4>
            <p>{x.note}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default TimeLinePage;
