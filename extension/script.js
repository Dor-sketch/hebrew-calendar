let currentDate = new Date();
let useDigits = false;
let isDarkTheme = false;
const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const daysOfWeekShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const hebrewNumerals = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה', 'ו׳', 'ז׳', 'ח׳', 'ט׳', 'י׳', 'י״א', 'י״ב', 'י״ג', 'י״ד', 'ט״ו', 'ט״ז', 'י״ז', 'י״ח', 'י״ט', 'כ', 'כ״א', 'כ״ב', 'כ״ג', 'כ״ד', 'כ״ה', 'כ״ו', 'כ״ז', 'כ״ח', 'כ״ט', 'ל'];

console.log('Script started. Initial state:', { currentDate, useDigits, isDarkTheme });

function initializeExtension() {
    console.log('Initializing extension...');
    chrome.storage.sync.get(['theme', 'useDigits', 'currentDate'], function(data) {
        console.log('Retrieved data from storage:', data);

        isDarkTheme = data.theme === 'dark';
        useDigits = data.useDigits || false;
        currentDate = data.currentDate ? new Date(data.currentDate) : new Date();

        console.log('Initialized state:', { isDarkTheme, useDigits, currentDate });

        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            console.log('Applied dark theme');
        }

        document.getElementById('themeToggle').textContent = isDarkTheme ? 'למצב בהיר' : 'למצב כהה';
        document.getElementById('toggle-digits').checked = useDigits;

        console.log('Updated UI elements');

        renderCalendar();
        updateClock();
        displayParashatHashavua();

        // Set up event listeners
        document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
        document.getElementById('toggle-digits').addEventListener('change', toggleDigits);
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);

        console.log('Set up event listeners');

        setInterval(updateClock, 1000);
        console.log('Started clock update interval');
    });
}

document.addEventListener('DOMContentLoaded', initializeExtension);
console.log('Added DOMContentLoaded event listener');

function toggleTheme() {
    console.log('Toggling theme. Current state:', isDarkTheme);
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = isDarkTheme ? 'למצב בהיר' : 'למצב כהה';

    chrome.storage.sync.set({theme: isDarkTheme ? 'dark' : 'light'}, function() {
        console.log('Theme saved to storage:', isDarkTheme ? 'dark' : 'light');
    });

    const parashaElement = document.getElementById('parasha-hashavua');
    if (parashaElement) {
        parashaElement.style.color = isDarkTheme ? '#ffffff' : '#000000';
    }
    renderCalendar();
    console.log('Theme toggled. New state:', isDarkTheme);
}

function toggleDigits() {
    console.log('Toggling digits. Current state:', useDigits);
    useDigits = !useDigits;
    chrome.storage.sync.set({useDigits: useDigits}, function() {
        console.log('Digit preference saved to storage:', useDigits);
    });
    renderCalendar();
    updateClock();
    console.log('Digits toggled. New state:', useDigits);
}

function changeMonth(delta) {
    console.log('Changing month. Current date:', currentDate);
    currentDate.setMonth(currentDate.getMonth() + delta);
    chrome.storage.sync.set({currentDate: currentDate.toISOString()}, function() {
        console.log('New date saved to storage:', currentDate.toISOString());
    });
    renderCalendar();
    console.log('Month changed. New date:', currentDate);
}
function getHebrewDate(gregorianDate) {
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
    const hebrewDateString = getHebrewDate(now);

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



        function handleResize() {
            renderCalendar();
        }



        window.addEventListener('resize', handleResize);
        setInterval(updateClock, 1000);
        renderCalendar();
        updateClock();


const parshiot2024 = [
    { date: new Date(2024, 0, 6), name: 'שְׁמוֹת' },
    { date: new Date(2024, 0, 13), name: 'וָאֵרָא' },
    { date: new Date(2024, 0, 20), name: 'בֹּא' },
    { date: new Date(2024, 0, 27), name: 'בְּשַׁלַּח' },
    { date: new Date(2024, 1, 3), name: 'יִתְרוֹ' },
    { date: new Date(2024, 1, 10), name: 'מִּשְׁפָּטִים' },
    { date: new Date(2024, 1, 17), name: 'תְּרוּמָה' },
    { date: new Date(2024, 1, 24), name: 'תְּצַוֶּה' },
    { date: new Date(2024, 2, 2), name: 'כִּי תִשָּׂא' },
    { date: new Date(2024, 2, 9), name: 'וַיַּקְהֵל' },
    { date: new Date(2024, 2, 16), name: 'פְקוּדֵי' },
    { date: new Date(2024, 2, 23), name: 'וַיִּקְרָא' },
    { date: new Date(2024, 2, 30), name: 'צַו' },
    { date: new Date(2024, 3, 6), name: 'שְּׁמִינִי' },
    { date: new Date(2024, 3, 13), name: 'תַזְרִיעַ' },
    { date: new Date(2024, 3, 20), name: 'מְּצֹרָע' },
    { date: new Date(2024, 4, 4), name: 'אַחֲרֵי מוֹת' },
    { date: new Date(2024, 4, 11), name: 'קְדשִׁים' },
    { date: new Date(2024, 4, 18), name: 'אֱמוֹר' },
    { date: new Date(2024, 4, 25), name: 'בְּהַר' },
    { date: new Date(2024, 5, 1), name: 'בְּחֻקֹּתַי' },
    { date: new Date(2024, 5, 8), name: 'בְּמִדְבַּר' },
    { date: new Date(2024, 5, 15), name: 'נָשׂא' },
    { date: new Date(2024, 5, 22), name: 'בְּהַעֲלֹתְךָ' },
    { date: new Date(2024, 5, 29), name: 'שְׁלַח־לְךָ' },
    { date: new Date(2024, 6, 6), name: 'קוֹרַח' },
    { date: new Date(2024, 6, 13), name: 'חֻקַּת' },
    { date: new Date(2024, 6, 20), name: 'בָּלָק' },
    { date: new Date(2024, 6, 27), name: 'פִּינְחָס' },
    { date: new Date(2024, 7, 3), name: 'מַּטּוֹת־מַסְעֵי' },
    { date: new Date(2024, 7, 10), name: 'דְּבָרִים' },
    { date: new Date(2024, 7, 17), name: 'וָאֶתְחַנַּן' },
    { date: new Date(2024, 7, 24), name: 'עֵקֶב' },
    { date: new Date(2024, 7, 31), name: 'רְאֵה' },
    { date: new Date(2024, 8, 7), name: 'שׁוֹפְטִים' },
    { date: new Date(2024, 8, 14), name: 'כִּי־תֵצֵא' },
    { date: new Date(2024, 8, 21), name: 'כִּי־תָבוֹא' },
    { date: new Date(2024, 8, 28), name: 'נִצָּבִים־וַיֵּלֶךְ' },
    { date: new Date(2024, 9, 5), name: 'הַאֲזִינוּ' },
    { date: new Date(2024, 9, 26), name: 'בְּרֵאשִׁית' },
    { date: new Date(2024, 10, 2), name: 'נֹחַ' },
    { date: new Date(2024, 10, 9), name: 'לֶךְ־לְךָ' },
    { date: new Date(2024, 10, 16), name: 'וַיֵּרָא' },
    { date: new Date(2024, 10, 23), name: 'חַיֵּי שָֹרָה' },
    { date: new Date(2024, 10, 30), name: 'תּוֹלְדוֹת' },
    { date: new Date(2024, 11, 7), name: 'וַיֵּצֵא' },
    { date: new Date(2024, 11, 14), name: 'וַיִּשְׁלַח' },
    { date: new Date(2024, 11, 21), name: 'וַיֵּשֶׁב' },
    { date: new Date(2024, 11, 28), name: 'מִקֵּץ' }
];

function getParashatHashavua() {
    const now = new Date();
    for (let i = parshiot2024.length - 1; i >= 0; i--) {
        if (now >= parshiot2024[i].date) {
            return parshiot2024[i].name;
        }
    }
    return parshiot2024[0].name; // Default to the first parasha if no match found
}

function displayParashatHashavua() {
    const parasha = getParashatHashavua();
    const parashaElement = document.createElement('div');
    parashaElement.id = 'parasha-hashavua';
    parashaElement.textContent = `פרשת השבוע: ${parasha}`;
    parashaElement.style.fontWeight = 'bold';
    parashaElement.style.marginTop = '10px';
    parashaElement.style.textAlign = 'center';
    parashaElement.style.direction = 'rtl'; // Ensure right-to-left text direction
    document.body.appendChild(parashaElement);
}
