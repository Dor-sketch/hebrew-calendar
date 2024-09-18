# Hebrew Date Calculation Algorithm

Web deployment: [Hebrew Date Calculator](https://dorpascal.com/hebrew-calendar/he/)
Chrome Extension: [Hebrew Date Calculator](https://chromewebstore.google.com/detail/hebrew-calendar/hibmadldekamhiflhbaflaiafdbigihe)
![alt text](chrome-preview.png)
The code uses JavaScript's `Intl.DateTimeFormat` API to convert Gregorian dates to Hebrew dates. Here's a breakdown of how it works:

1. **Intl.DateTimeFormat Initialization:**

   ```javascript
   const options = { day: 'numeric', month: 'long', year: 'numeric' };
   const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', options);
   ```

   - This creates a date formatter for the Hebrew calendar ('ca-hebrew') in the Israeli locale ('he-IL').
   - It's set to output the day as a number, month as a full name, and year as a number.

2. **Date Formatting:**

   ```javascript
   const parts = formatter.formatToParts(gregorianDate);
   ```

   - This method breaks down the formatted date into its constituent parts (day, month, year).

3. **Custom Formatting:**
   The code then iterates through these parts to create a custom Hebrew date string:
   - For the day: It either uses the numeric value or converts it to Hebrew numerals.
   - For the month: It uses the Hebrew month name provided by the formatter.
   - For the year: It either uses the numeric value or converts it to traditional Hebrew year notation.

4. **Hebrew Numerals Conversion:**
   - Days are converted using a predefined array of Hebrew numerals.
   - Years are converted using a more complex function that handles the thousands, hundreds, tens, and ones places separately.

5. **Underlying Calculation:**
   While the code doesn't explicitly perform the conversion calculations, the `Intl.DateTimeFormat` API is doing this behind the scenes. The conversion involves:
   - Accounting for the different lengths of Hebrew and Gregorian years.
   - Handling the 19-year Metonic cycle in the Hebrew calendar, which aligns the lunar months with the solar year.
   - Adjusting for the Hebrew calendar's leap months.

6. **Key Differences:**
   - The Hebrew calendar is lunisolar, based on moon phases and the solar year.
   - Hebrew days begin at sunset.
   - Hebrew years are counted from the traditional Jewish date of the world's creation.
   - The Hebrew calendar has leap months rather than leap days.

This approach leverages the browser's built-in localization capabilities, ensuring accuracy and reducing the need for complex custom calculations. However, it also means the code is dependent on the browser's implementation of the Hebrew calendar.
