document.addEventListener('DOMContentLoaded', function () {
    const { HebrewCalendar, HDate } = window.Hebcal;

    // Get today's Gregorian date
    const today = new Date();

    // Convert it to a Hebrew date
    const hebrewDate = new HDate(today);

    // Get the current Hebrew month and year
    const monthName = hebrewDate.getMonthName();
    const year = hebrewDate.getFullYear();

    // Start building the calendar HTML
    let calendarHTML = `<div class="month">${monthName} ${year}</div>`;
    calendarHTML += '<div class="days">';

    // Get the number of days in the Hebrew month
    const daysInMonth = hebrewDate.daysInMonth();

    for (let day = 1; day <= daysInMonth; day++) {
        const dayHebrewDate = new HDate(day, hebrewDate.getMonth(), hebrewDate.getFullYear());
        calendarHTML += `
            <div class="day">
                <div>${day}</div>
                <div class="hebrew-date">${dayHebrewDate.renderGematriya()}</div>
            </div>
        `;
    }

    calendarHTML += '</div>';
    document.getElementById('calendar').innerHTML = calendarHTML;
});
