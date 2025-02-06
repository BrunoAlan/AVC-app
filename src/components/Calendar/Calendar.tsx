import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
    format,
    parseISO,
    isBefore,
    isAfter,
    addDays,
    differenceInCalendarDays,
} from 'date-fns';
import { GlobalTheme } from '@src/constants/theme/GlobalTheme';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';
import { useCalendars } from '@node_modules/expo-localization/build/Localization';

/**
 * Adjusts a hexadecimal color by a given amount (can be positive or negative).
 * @param color - The color in hexadecimal format (e.g., "#abc" or "#aabbcc").
 * @param amount - The value to add or subtract from each RGB component.
 * @returns A new color string in full hexadecimal format (e.g., "#aabbcc").
 */
function adjustColor(color: string, amount: number): string {
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

    // Helper function to clamp the values to the [0..255] range
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

// Define your minimum and maximum LOS
const MIN_LOS = 3;
const MAX_LOS = 5;

const CustomCalendar = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const { setCheckIn, setCheckOut } = useSearchParamsStore();

    /**
     * Handles the day press event:
     * - If there is no start date, set the chosen date as startDate.
     * - If a start date exists but no end date, define the end date with LOS checks.
     * - If both startDate and endDate exist, selecting a new date resets the range.
     */
    const onDayPress = (day: any) => {
        // First date selection
        if (!startDate) {
            setStartDate(day.dateString);
            setCheckIn(day.dateString);
            setEndDate(null);
            setCheckOut('');
            return;
        }

        // Second date selection (apply LOS constraints)
        if (!endDate) {
            let start = parseISO(startDate);
            let end = parseISO(day.dateString);

            // If the newly selected date is before the start date, swap them
            if (isBefore(end, start)) {
                [start, end] = [end, start];
            }

            // Calculate the difference in days (+ 1 for inclusive)
            let diff = differenceInCalendarDays(end, start) + 1;

            // Clamp diff between MIN_LOS and MAX_LOS
            if (diff < MIN_LOS) {
                diff = MIN_LOS;
            } else if (diff > MAX_LOS) {
                diff = MAX_LOS;
            }

            // Recompute the 'end' date after clamping
            end = addDays(start, diff - 1);

            // Format to "YYYY-MM-DD" strings
            const newStartDate = format(start, 'yyyy-MM-dd');
            const newEndDate = format(end, 'yyyy-MM-dd');

            // Update state
            setStartDate(newStartDate);
            setCheckIn(newStartDate);
            setEndDate(newEndDate);
            setCheckOut(newEndDate);

            return;
        }

        // If both startDate and endDate exist, reset
        setStartDate(day.dateString);
        setCheckIn(day.dateString);
        setEndDate(null);
        setCheckOut('');
    };

    /**
     * Generates an array of all dates between 'start' and 'end' (inclusive).
     * Uses date-fns for iteration and formatting.
     * Output format: "YYYY-MM-DD"
     */
    const getDatesRange = (start: string, end: string): string[] => {
        const result: string[] = [];
        let currentDate = parseISO(start);
        const finalDate = parseISO(end);

        while (!isAfter(currentDate, finalDate)) {
            result.push(format(currentDate, 'yyyy-MM-dd'));
            currentDate = addDays(currentDate, 1);
        }

        return result;
    };

    /**
     * Returns the "markedDates" object required by react-native-calendars
     * to display the date range with custom styles.
     */
    const getMarkedDates = () => {
        // If there is no start date, do not mark anything
        if (!startDate) return {};

        // If we only have a start date, mark it as both start and end (single day selected)
        if (!endDate) {
            return {
                [startDate]: {
                    startingDay: true,
                    endingDay: true,
                    color: GlobalTheme.colors.main,
                    textColor: GlobalTheme.colors.white,
                },
            };
        }

        // If there is a start date and an end date, mark all dates in the range
        const range = getDatesRange(startDate, endDate);
        const marked: Record<string, any> = {};

        range.forEach((date, index) => {
            if (index === 0) {
                // First day of the range
                marked[date] = {
                    startingDay: true,
                    color: GlobalTheme.colors.main,
                    textColor: GlobalTheme.colors.white,
                };
            } else if (index === range.length - 1) {
                // Last day of the range
                marked[date] = {
                    endingDay: true,
                    color: GlobalTheme.colors.main,
                    textColor: GlobalTheme.colors.white,
                };
            } else {
                // Intermediate day of the range
                marked[date] = {
                    color: adjustColor(GlobalTheme.colors.main, 20),
                    textColor: GlobalTheme.colors.white,
                };
            }
        });

        return marked;
    };

    return (
        <View>
            <Text>Checkin {startDate}</Text>
            <Text>Checkout {endDate}</Text>
            <Calendar
                theme={{
                    arrowColor: GlobalTheme.colors.main,
                }}
                // Use date-fns to generate today's date in "YYYY-MM-DD" format
                minDate={format(new Date(), 'yyyy-MM-dd')}
                onDayPress={onDayPress}
                markingType='period' // Marking type for range
                markedDates={getMarkedDates()}
            />
        </View>
    );
};

export default CustomCalendar;
