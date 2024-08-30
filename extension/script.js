let currentDate = new Date();
const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const daysOfWeekShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const hebrewNumerals = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה', 'ו׳', 'ז׳', 'ח׳', 'ט׳', 'י׳', 'י״א', 'י״ב', 'י״ג', 'י״ד', 'ט״ו', 'ט״ז', 'י״ז', 'י״ח', 'י״ט', 'כ', 'כ״א', 'כ״ב', 'כ״ג', 'כ״ד', 'כ״ה', 'כ״ו', 'כ״ז', 'כ״ח', 'כ״ט', 'ל'];
let useDigits = false;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    document.getElementById('toggle-digits').addEventListener('change', toggleDigits);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Load saved theme
    chrome.storage.sync.get('theme', function(data) {
        if (data.theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('themeToggle').textContent = 'למצב בהיר';
        }
    });

    renderCalendar();
    updateClock();
    setInterval(updateClock, 1000);
});

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.getElementById('themeToggle');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDarkTheme ? 'למצב בהיר' : 'למצב כהה';

    // Save theme preference
    chrome.storage.sync.set({theme: isDarkTheme ? 'dark' : 'light'});

    renderCalendar();
}


        function getHebrewDate(gregorianDate, useDigits = false) {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', options);
            const parts = formatter.formatToParts(gregorianDate);

            let hebrewDate = '';
            parts.forEach(part => {
                if (part.type === 'day') {
                    hebrewDate += useDigits ? part.value : hebrewNumerals[parseInt(part.value) - 1];
                } else if (part.type === 'month') {
                    hebrewDate += ' ' + part.value;
                } else if (part.type === 'year') {
                    hebrewDate += ' ' + (useDigits ? part.value : convertToHebrewYear(part.value));
                }
            });

            return hebrewDate.trim();
        }

  function convertToHebrewYear(numericYear) {
    const hebrewNumerals = [
        'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'
    ];
    const specialCases = {
        15: 'ט״ו',
        16: 'ט״ז'
    };

    let year = parseInt(numericYear) - 5000;  // Convert to Hebrew year by subtracting 5000
    let result = 'ה׳';  // Start with 'ה׳' for the Hebrew millennium

    // Calculate the remaining year after removing the first 5000
    let hundreds = Math.floor(year / 100);
    year %= 100;
    let tens = Math.floor(year / 10);
    let ones = year % 10;

    // Append the correct Hebrew letter for the hundreds place
    if (hundreds > 0) {
        // For 784, 7 should be translated to ת (400)
        if (hundreds === 7) {
            result += 'תש';
        } else if (hundreds === 6) {
            result += 'ש';
        } else if (hundreds === 5) {
            result += 'ה';
        } else if (hundreds === 4) {
            result += 'ד';
        }
    }

    // Append the correct Hebrew letter for the tens place
    if (tens > 0) {
        const tensMap = {
            1: 'י',  // 10
            2: 'כ',  // 20
            3: 'ל',  // 30
            4: 'מ',  // 40
            5: 'נ',  // 50
            6: 'ס',  // 60
            7: 'ע',  // 70
            8: 'פ',  // 80
            9: 'צ'   // 90
        };
        result += tensMap[tens];
    }

    // Append the correct Hebrew letter for the ones place
    if (ones > 0) {
        result += hebrewNumerals[ones - 1];  // Ones start at index 0
    }

    // Adjust for special cases like ט״ו and ט״ז
    if (tens === 1 && (ones === 5 || ones === 6)) {
        result = result.slice(0, -2) + specialCases[tens * 10 + ones];
    } else {
        // Add the final punctuation
        if (result.length > 3) {
            result = result.slice(0, -1) + '״' + result.slice(-1);
        } else if (result.length > 2) {
            result += '׳';
        }
    }

    return result;
}


        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('he-IL');
            const dateString = now.toLocaleDateString('he-IL');
            const hebrewDateString = getHebrewDate(now, useDigits);

            document.getElementById('clock').textContent = timeString;
            document.getElementById('date-display').textContent = `${dateString} - ${hebrewDateString}`;
        }

        function renderCalendar() {
            const calendarEl = document.getElementById('calendar');
            calendarEl.innerHTML = '';

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            document.getElementById('current-month').textContent = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' }).format(currentDate);

            const isSmallScreen = window.innerWidth <= 480;
            const dayNames = isSmallScreen ? daysOfWeekShort : daysOfWeek;

            dayNames.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'day day-header' + (isSmallScreen ? ' single-letter' : '');
                dayHeader.textContent = day;
                calendarEl.appendChild(dayHeader);
            });

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const today = new Date();

            for (let i = firstDay.getDay() - 1; i >= 0; i--) {
                const dayEl = createDayElement(new Date(year, month, -i), true);
                calendarEl.appendChild(dayEl);
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dayEl = createDayElement(new Date(year, month, day), false, today);
                calendarEl.appendChild(dayEl);
            }

            const remainingSlots = 42 - calendarEl.children.length;
            for (let day = 1; day <= remainingSlots; day++) {
                const dayEl = createDayElement(new Date(year, month + 1, day), true);
                calendarEl.appendChild(dayEl);
            }
        }

        function createDayElement(date, isOtherMonth, today) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day' + (isOtherMonth ? ' other-month' : '');

            if (today && date.toDateString() === today.toDateString()) {
                dayEl.classList.add('today');
            }

            const hebrewDate = getHebrewDate(date, useDigits).split(' ')[0];
            const gregorianDate = date.getDate() + '/' + (date.getMonth() + 1);

            dayEl.innerHTML = `
                <div>${hebrewDate}</div>
                <div class="gregorian-date">${gregorianDate}</div>
            `;

            return dayEl;
        }

        function changeMonth(delta) {
            currentDate.setMonth(currentDate.getMonth() + delta);
            renderCalendar();
        }

        function toggleDigits() {
            useDigits = !useDigits;
            renderCalendar();
            updateClock();
        }

        function handleResize() {
            renderCalendar();
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            // change the button text
            const themeToggle = document.querySelector('.theme-toggle');
            themeToggle.textContent = document.body.classList.contains('dark-theme') ? 'למצב בהיר' : 'למצב כהה';
            renderCalendar();
        }

        window.addEventListener('resize', handleResize);
        setInterval(updateClock, 1000);
        renderCalendar();
        updateClock();