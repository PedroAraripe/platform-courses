import moment from "moment-timezone";

export const formatDateToUserTz = (date) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return moment(date)
    .tz(userTimeZone)
    .format("DD/MM/YYYY HH:mm:ss")
}