export const timeFormat = time => {
  let date = new Date(time);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  let diff = new Date().getTime() - date.getTime();

  if (diff < 1000) {
    return "right now";
  }

  let sec = Math.floor(diff / 1000);

  if (sec === 1) {
    return "1 second ago";
  }

  if (sec < 60) {
    return sec + " seconds ago";
  }

  let min = Math.floor(diff / 60 / 1000);
  if (min === 1) {
    return "1 minute ago";
  }
  if (min < 60) {
    return min + " minutes ago";
  }

  let hour = Math.floor(diff / 60 / 60 / 1000);
  if (hour === 1) {
    return "1 hour ago";
  }
  if (hour < 24) {
    return hour + " hours ago";
  }

  let day = Math.floor(diff / 24 / 60 / 60 / 1000);
  if (day === 1) {
    return "1 day ago";
  }
  if (day < 7) {
    return day + " days ago";
  }

  let week = Math.floor(diff / 7 / 24 / 60 / 60 / 1000);
  if (week === 1) {
    return "1 week ago";
  }
  if (week < 4) {
    return week + " weeks ago";
  }

  let mon = Math.floor(diff / 5 / 7 / 24 / 60 / 60 / 1000);
  if (mon === 1) {
    return "1 month ago";
  }

  return mon + " month ago";
};
