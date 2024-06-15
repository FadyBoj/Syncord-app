// Import required module for date manipulation
import { differenceInDays, differenceInMonths, differenceInYears, formatDistanceToNow } from 'date-fns';

/**
 * Returns a string representing the relative time from the given UTC date to now.
 * @param {string} utcDate - The UTC date string to compare.
 * @returns {string} - A string representing the relative time (e.g., "now", "today", "yesterday", "2d ago", "1 month ago", "1 year ago").
 */
const getRelativeTime = (utcDate: string): string => {
    const date = new Date(utcDate);
    const now = new Date();

    const daysDifference = differenceInDays(now, date);
    const monthsDifference = differenceInMonths(now, date);
    const yearsDifference = differenceInYears(now, date);

    if (daysDifference === 0) {
        return "today";
    } else if (daysDifference === 1) {
        return "yesterday";
    } else if (daysDifference < 30) {
        return `${daysDifference}d ago`;
    } else if (monthsDifference < 12) {
        return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    } else {
        return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
    }
};

// Export the function as the default export
export default getRelativeTime;
