function getMonth(utcDateString: string): { month: number, year: number, day: number, hour: number } {
  // Create a Date object from the UTC date string
  const date = new Date(utcDateString);
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  // Get the local month, year, day, and hour
  const localMonth = utcDate.getMonth() + 1; // Adding 1 to convert from 0-based to 1-based
  const localYear = utcDate.getFullYear();
  const localDay = utcDate.getDate();
  const localHour = utcDate.getHours();

  return {
    month: localMonth,
    year: localYear,
    day: localDay,
    hour: localHour,
  };
}

export default getMonth;
