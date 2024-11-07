export const formatDateTime = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
