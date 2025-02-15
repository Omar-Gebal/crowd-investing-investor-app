export function separateDateTime(dateString) {
    const dateObj = new Date(dateString);

    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();

    return { date, time };
}
