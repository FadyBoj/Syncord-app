import moment from 'moment-timezone';

const convertDate = (dateString: string): string => {
  // Parse the input date string
  const date = new Date(dateString);

  // Adjust the date to local time using moment-timezone
  const localDate = moment(date).tz(moment.tz.guess());

  // Format the date to a readable string in the desired format
  const readableDate = localDate.format('DD/MM/YYYY h:mm A');

  return readableDate;
};

export default convertDate;
