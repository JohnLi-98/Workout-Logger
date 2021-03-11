import { formatError } from "graphql";

export const convertToDateTime = (timestamp) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = "0" + date.getHours();
  const min = "0" + date.getMinutes();
  const formattedDate = `${day} ${month} ${year} - ${hour.substr(
    -2
  )}:${min.substr(-2)}`;
  return formattedDate;
};
