export const showTime = (dueDate, dayView) => {
  const moment = require("moment");
  const targetDate = moment(dueDate);

  const currentDate = moment();

  const duration = moment.duration(targetDate.diff(currentDate));
  const years = duration.years();
  const months = duration.months();
  // const weeks = Math.floor(duration.asDays() / 7) - years * 52 - months * 4;
  const days = Math.floor(duration.asDays() % 7);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let countdownString = "";
  if (years > 0) countdownString += `${years} years `;
  if (months > 0) countdownString += `${months} months `;
  // if (weeks > 0) countdownString += `${weeks} weeks `;
  if (days > 0) countdownString += `${days} days `;
  if (hours > 0 && (dayView === "daily" || dayView === "weekly"))
  countdownString += `${hours} hours `;
if (minutes > 0 && (dayView === "daily" || dayView === "weekly"))
countdownString += `${minutes} minutes `;
  return countdownString.trim() 
};
