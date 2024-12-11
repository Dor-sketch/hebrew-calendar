let currentDate = new Date();
let useDigits = false;
let isDarkTheme = false;
const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const daysOfWeekShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const hebrewNumerals = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה', 'ו׳', 'ז׳', 'ח׳', 'ט׳', 'י׳', 'י״א', 'י״ב', 'י״ג', 'י״ד', 'ט״ו', 'ט״ז', 'י״ז', 'י״ח', 'י״ט', 'כ', 'כ״א', 'כ״ב', 'כ״ג', 'כ״ד', 'כ״ה', 'כ״ו', 'כ״ז', 'כ״ח', 'כ״ט', 'ל'];
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
    { date: new Date(2024, 11, 28), name: 'מִקֵּץ' },
    // 2025 Parshiot
    { date: new Date(2025, 0, 4), name: 'וַיִּגַּשׁ' },
    { date: new Date(2025, 0, 11), name: 'וַיְחִי' },
    { date: new Date(2025, 0, 18), name: 'שְׁמוֹת' },
    { date: new Date(2025, 0, 25), name: 'וָאֵרָא' },
    { date: new Date(2025, 1, 1), name: 'בֹּא' },
    { date: new Date(2025, 1, 8), name: 'בְּשַׁלַּח' },
    { date: new Date(2025, 1, 15), name: 'יִתְרוֹ' },
    { date: new Date(2025, 1, 22), name: 'מִּשְׁפָּטִים' },
    { date: new Date(2025, 2, 1), name: 'תְּרוּמָה' },
    { date: new Date(2025, 2, 8), name: 'תְּצַוֶּה' },
    { date: new Date(2025, 2, 15), name: 'כִּי תִשָּׂא' },
    { date: new Date(2025, 2, 22), name: 'וַיַּקְהֵל־פְקוּדֵי' },
    { date: new Date(2025, 2, 29), name: 'וַיִּקְרָא' },
    { date: new Date(2025, 3, 5), name: 'צַו' },
    { date: new Date(2025, 3, 12), name: 'שְּׁמִינִי' },
    { date: new Date(2025, 3, 19), name: 'תַזְרִיעַ־מְצֹרָע' },
    { date: new Date(2025, 3, 26), name: 'אַחֲרֵי מוֹת־קְדשִׁים' },
    { date: new Date(2025, 4, 3), name: 'אֱמוֹר' },
    { date: new Date(2025, 4, 10), name: 'בְּהַר־בְּחֻקֹּתַי' },
    { date: new Date(2025, 4, 17), name: 'בְּמִדְבַּר' },
    { date: new Date(2025, 4, 24), name: 'נָשׂא' },
    { date: new Date(2025, 4, 31), name: 'בְּהַעֲלֹתְךָ' },
    { date: new Date(2025, 5, 7), name: 'שְׁלַח־לְךָ' },
    { date: new Date(2025, 5, 14), name: 'קוֹרַח' },
    { date: new Date(2025, 5, 21), name: 'חֻקַּת־בָּלָק' },
    { date: new Date(2025, 5, 28), name: 'פִּינְחָס' },
    { date: new Date(2025, 6, 5), name: 'מַּטּוֹת־מַסְעֵי' },
    { date: new Date(2025, 6, 12), name: 'דְּבָרִים' },
    { date: new Date(2025, 6, 19), name: 'וָאֶתְחַנַּן' },
    { date: new Date(2025, 6, 26), name: 'עֵקֶב' },
    { date: new Date(2025, 7, 2), name: 'רְאֵה' },
    { date: new Date(2025, 7, 9), name: 'שׁוֹפְטִים' },
    { date: new Date(2025, 7, 16), name: 'כִּי־תֵצֵא' },
    { date: new Date(2025, 7, 23), name: 'כִּי־תָבוֹא' },
    { date: new Date(2025, 7, 30), name: 'נִצָּבִים' },
    { date: new Date(2025, 8, 6), name: 'וַיֵּלֶךְ' },
    { date: new Date(2025, 8, 13), name: 'הַאֲזִינוּ' },
    { date: new Date(2025, 8, 27), name: 'בְּרֵאשִׁית' },
    { date: new Date(2025, 9, 4), name: 'נֹחַ' },
    { date: new Date(2025, 9, 11), name: 'לֶךְ־לְךָ' },
    { date: new Date(2025, 9, 18), name: 'וַיֵּרָא' },
    { date: new Date(2025, 9, 25), name: 'חַיֵּי שָֹרָה' },
    { date: new Date(2025, 10, 1), name: 'תּוֹלְדוֹת' },
    { date: new Date(2025, 10, 8), name: 'וַיֵּצֵא' },
    { date: new Date(2025, 10, 15), name: 'וַיִּשְׁלַח' },
    { date: new Date(2025, 10, 22), name: 'וַיֵּשֶׁב' },
    { date: new Date(2025, 10, 29), name: 'מִקֵּץ' },
    { date: new Date(2025, 11, 6), name: 'וַיִּגַּשׁ' },
    { date: new Date(2025, 11, 13), name: 'וַיְחִי' },
    { date: new Date(2025, 11, 20), name: 'שְׁמוֹת' },
    { date: new Date(2025, 11, 27), name: 'וָאֵרָא' }
];
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
             const gregorianMonth = new Intl.DateTimeFormat('he-IL', { month: 'long', year: 'numeric' }).format(currentDate);
    const hebrewMonth = currentDate.toLocaleDateString('he-IL-u-ca-hebrew', { month: 'long', year: 'numeric' }).split(' ')[0];

            document.getElementById('current-month').textContent = `${gregorianMonth.split(' ')[0]} / ${hebrewMonth} ${gregorianMonth.split(' ')[1]}`;

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

            // if shapat add weekly parasha
            if (date.getDay() === 6) {
                const nextWeek = new Date(date);
                nextWeek.setDate(date.getDate() - 7); // Move 7 days ahead
                const parasha = getParashatHashavua(nextWeek);
                const parashaEl = document.createElement('div');
                parashaEl.className = 'parasha';
                parashaEl.textContent = parasha;
                dayEl.appendChild(parashaEl);
            }

            // if new month add month name
            if (date.getDate() === 1) {
                const monthName = new Intl.DateTimeFormat('he-IL', { month: 'long' }).format(date);
                const monthEl = document.createElement('div');
                monthEl.className = 'month-name';
                monthEl.textContent = monthName;
                dayEl.appendChild(monthEl);
            }

            // if new hebrew month add month name
            if (hebrewDate === 'א׳') {
            console.log('hebrewDate:', hebrewDate);
                const monthName = date.toLocaleDateString('he-IL-u-ca-hebrew', { month: 'long' }).split(' ')[0];
                const monthEl = document.createElement('div');
                monthEl.className = 'month-name';
                monthEl.textContent = monthName;
                dayEl.appendChild(monthEl);
                // make green background
                dayEl.classList.add('new-hebrew-month');
            }

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




    function getParashatHashavua(hebrewDate = null) {
        let now;
        if (hebrewDate) {
            // Convert Hebrew date to Gregorian date
            now = new Date(hebrewDate.toLocaleDateString('en-US', { calendar: 'gregory' }));
        } else {
            now = new Date();
        }
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7); // Move 7 days ahead

        for (let i = parshiot2024.length - 1; i >= 0; i--) {
            if (nextWeek >= parshiot2024[i].date) {
                return parshiot2024[i].name;
            }
        }
        return parshiot2024[0].name;
    }

function displayParashatHashavua() {
    const parasha = getParashatHashavua();
    const parashaElement = document.getElementById('parasha');
    parashaElement.id = 'parasha-hashavua';
    parashaElement.textContent = `פרשת השבוע: ${parasha}`;
    parashaElement.style.fontWeight = 'bold';
    parashaElement.style.marginTop = '10px';
    parashaElement.style.textAlign = 'center';
    parashaElement.style.direction = 'rtl'; // Ensure right-to-left text direction
}
