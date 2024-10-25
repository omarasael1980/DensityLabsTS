const DateFormater = (date) => {
  const dateDate = new Date(date);
  const dateFormated = dateDate.toLocaleString("default", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return dateFormated;
};

export default DateFormater;
