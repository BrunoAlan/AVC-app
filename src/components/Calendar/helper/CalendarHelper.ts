import {
    parseISO,
    isBefore,
    isAfter,
    addDays,
    differenceInCalendarDays,
    format,
} from 'date-fns';

/**
 * Adjusts a hexadecimal color by a given amount (can be positive or negative).
 * @param color - The color in hexadecimal format (e.g., "#abc" or "#aabbcc").
 * @param amount - The value to add or subtract from each RGB component.
 * @returns A new color string in full hexadecimal format (e.g., "#aabbcc").
 */
export function adjustColor(color: string, amount: number): string {
    // Remove the '#' prefix if present
    let hex = color.replace(/^#/, '');

    // Convert shorthand notation (#abc) to the full 6-digit notation (#aabbcc)
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    }

    // Verify that the resulting string is a valid 6-digit hexadecimal
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error('Invalid hexadecimal color');
    }

    // Helper function to clamp values to [0..255]
    const clamp = (value: number) => Math.min(255, Math.max(0, value));

    // Parse R, G, and B from the hex string, adjust each by 'amount', and clamp
    const r = clamp(parseInt(hex.slice(0, 2), 16) + amount);
    const g = clamp(parseInt(hex.slice(2, 4), 16) + amount);
    const b = clamp(parseInt(hex.slice(4, 6), 16) + amount);

    // Convert each component back to a 2-digit hexadecimal string
    const rr = r.toString(16).padStart(2, '0');
    const gg = g.toString(16).padStart(2, '0');
    const bb = b.toString(16).padStart(2, '0');

    // Return the adjusted color in full hexadecimal format
    return `#${rr}${gg}${bb}`;
}

/**
 * Clamps the length-of-stay (LOS) between a minimum and maximum,
 * then returns the new startDate/endDate in "yyyy-MM-dd" format.
 */
export function clampLosRange(
    startDate: string,
    selectedDate: string,
    minLos: number,
    maxLos: number
): { newStartDate: string; newEndDate: string } {
    let start = parseISO(startDate);
    let end = parseISO(selectedDate);

    // Swap if the selected date is before the start date
    if (isBefore(end, start)) {
        [start, end] = [end, start];
    }

    // Calculate the difference in days (+1 for inclusive range)
    let diff = differenceInCalendarDays(end, start) + 1;

    // Clamp the LOS
    if (diff < minLos) diff = minLos;
    if (diff > maxLos) diff = maxLos;

    // Recompute the 'end' date after clamping
    end = addDays(start, diff - 1);

    return {
        newStartDate: format(start, 'yyyy-MM-dd'),
        newEndDate: format(end, 'yyyy-MM-dd'),
    };
}

/**
 * Returns an array of all dates between 'start' and 'end' (inclusive).
 * Output format: "YYYY-MM-DD"
 */
export function getDatesRange(start: string, end: string): string[] {
    const result: string[] = [];
    let currentDate = parseISO(start);
    const finalDate = parseISO(end);

    while (!isAfter(currentDate, finalDate)) {
        result.push(format(currentDate, 'yyyy-MM-dd'));
        currentDate = addDays(currentDate, 1);
    }

    return result;
}
