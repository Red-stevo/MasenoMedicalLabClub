export const structureDateFormat = (date) => {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');

    return {date:`${year}-${month}-${day}` , time:`${hours}:${minutes}`}

}