import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { GlobalTheme } from '@src/constants/theme/GlobalTheme';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';

import {
    adjustColor,
    clampLosRange,
    getDatesRange,
} from './helper/CalendarHelper';
import {
    type MarkedDates,
    type DateData,
} from 'react-native-calendars/src/types';

// Define minimum and maximum LOS
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
    const onDayPress = (day: DateData) => {
        // 1) If no start date, this is the first selection
        if (!startDate) {
            setStartDate(day.dateString);
            setCheckIn(day.dateString);
            setEndDate(null);
            setCheckOut('');
            return;
        }

        // 2) If we have a start date but no end date, clamp the LOS
        if (!endDate) {
            const { newStartDate, newEndDate } = clampLosRange(
                startDate,
                day.dateString,
                MIN_LOS,
                MAX_LOS
            );
            setStartDate(newStartDate);
            setCheckIn(newStartDate);
            setEndDate(newEndDate);
            setCheckOut(newEndDate);
            return;
        }

        // 3) If both start and end exist, picking another date resets the selection
        setStartDate(day.dateString);
        setCheckIn(day.dateString);
        setEndDate(null);
        setCheckOut('');
    };

    /**
     * Returns the "markedDates" object required by react-native-calendars
     * to display the date range with custom styles.
     */
    const getMarkedDates = (): MarkedDates => {
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

        // Otherwise, get all days in the [startDate..endDate] range
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
                minDate={format(new Date(), 'yyyy-MM-dd')}
                onDayPress={onDayPress}
                markingType='period'
                markedDates={getMarkedDates()}
            />
        </View>
    );
};

export default CustomCalendar;
