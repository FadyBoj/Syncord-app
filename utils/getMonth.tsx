import moment from "moment-timezone";

function getMonth(utcDateString: string): { month: number, year: number, day: number, hour: number } {
  // Parse the UTC date string using Moment.js
  const utcMoment = moment.utc(utcDateString);
  
  // Convert to local time
  const localMoment = utcMoment.local();
  
  // Get the local month, year, day, and hour
  const localMonth = localMoment.month() + 1; // Adding 1 to convert from 0-based to 1-based
  const localYear = localMoment.year();
  const localDay = localMoment.date();
  const localHour = localMoment.hour();

  return {
    month: localMonth,
    year: localYear,
    day: localDay,
    hour: localHour,
  };
}

export default getMonth;
