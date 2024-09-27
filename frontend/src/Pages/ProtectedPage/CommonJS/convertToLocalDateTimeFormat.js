export const convertToLocalDateTimeFormat = (isoDateString) => {
    const date = new Date(isoDateString);

    // Pad the month, day, hours, and minutes with leading zeros if needed
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Return the formatted string suitable for input[type="datetime-local"]
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}