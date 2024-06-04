function getMonth(utcDateString: string): { month: number, year: number, day: number } {
  // Create a Date object from the UTC date string
  const utcDate = new Date(utcDateString);

  // Get the local month, year, and day
  const localMonth = utcDate.getMonth() + 1; // Adding 1 to convert from 0-based to 1-based
  const localYear = utcDate.getFullYear();
  const localDay = utcDate.getDate();

  return {
    month: localMonth,
    year: localYear,
    day: localDay,
  };
}

export default getMonth;
