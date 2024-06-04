// File path: src/formatUTCDateToLocal.ts

function getMonthYear(utcDateString: string): string {
    // Step 1: Parse the input UTC date string
    const utcDate = new Date(utcDateString);
    
    // Validate if the date is valid
    if (isNaN(utcDate.getTime())) {
        throw new Error("Invalid date string");
    }
    
    // Step 2: Convert UTC date to local date
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    
    // Step 3: Extract month, day, and year from the local Date object
    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month: string = monthNames[localDate.getMonth()];
    const day: number = localDate.getDate();
    const year: number = localDate.getFullYear();
    
    // Step 4: Format these values into the desired string format
    return `${month} ${day}, ${year}`;
}

export default getMonthYear 
