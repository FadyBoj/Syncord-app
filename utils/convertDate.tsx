const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    // Adjust the date to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  
    // Define options for toLocaleString
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
  
    // Format the date to a readable string
    const readableDate = localDate.toLocaleString(undefined, options);
  
    // Extract and rearrange date parts
    const match = readableDate.match(/(\d{2})\/(\d{2})\/(\d{4}),\s(\d{1,2}:\d{2}\s[APap][Mm])/);
    if (match) {
      const [_, month, day, year, time] = match;
      return `${month}/${day}/${year} ${time}`;
    } else {
      throw new Error("Invalid date format");
    }
  };
  
  export default convertDate;
  