function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateDate(dayOfYear, year) {
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 0;

    while (dayOfYear > daysInMonth[month]) {
        dayOfYear -= daysInMonth[month];
        month++;
    }

    return `${String(dayOfYear).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
}

function calculateWeekOfYear(dayOfYear, year) {
    const date = new Date(year, 0, dayOfYear);
    const oneJan = new Date(year, 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

document.getElementById('calculate-btn').addEventListener('click', function () {
    const day = parseInt(document.getElementById('day').value);
    const year = parseInt(document.getElementById('year').value);

    if (isNaN(day) || isNaN(year) || day < 1 || day > (isLeapYear(year) ? 366 : 365)) {
        alert("Invalid input. Please enter a valid day of the year and year.");
        return;
    }

    const dateStr = calculateDate(day, year);
    const weekOfYear = calculateWeekOfYear(day, year);
    const leapYear = isLeapYear(year);

    document.getElementById('result').innerHTML = `
        <p><strong>Date:</strong> ${dateStr}</p>
        <p><strong>Week of the Year:</strong> ${weekOfYear}</p>
        <p><strong>Leap Year:</strong> ${leapYear ? 'Yes' : 'No'}</p>
    `;
});
