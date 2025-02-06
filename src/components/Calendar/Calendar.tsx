import { useCalendars } from '@node_modules/expo-localization/build/Localization';
import { GlobalTheme } from '@src/constants/theme/GlobalTheme';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

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

const CustomCalendar = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    const { setCheckIn, setCheckOut } = useSearchParamsStore();

    const onDayPress = (day: any) => {
        // Si no hay fecha inicial, se asigna la primera
        if (!startDate) {
            setStartDate(day.dateString);
            setCheckIn(day.dateString);
            setEndDate(null);
            setCheckOut('');

            return;
        }

        // Si ya hay startDate pero no endDate, se define endDate.
        // Si la fecha seleccionada es anterior, intercambiamos las fechas.
        if (!endDate) {
            const selected = day.dateString;
            if (selected < startDate) {
                setEndDate(startDate);
                setCheckOut(startDate);
                setStartDate(selected);
                setCheckIn(selected);
            } else {
                setEndDate(selected);
                setCheckOut(selected);
            }
            return;
        }

        // Si ya existe un rango completo (startDate y endDate),
        // al seleccionar una nueva fecha se reinicia el rango.
        setStartDate(day.dateString);
        setCheckIn(day.dateString);
        setEndDate(null);
        setCheckOut('');
    };

    /**
     * Genera un array con todas las fechas entre start y end (incluyéndolas).
     * Formato de salida: "YYYY-MM-DD"
     */
    const getDatesRange = (start: string, end: string): string[] => {
        let range: string[] = [];
        let currentDate = new Date(start);

        while (currentDate <= new Date(end)) {
            range.push(currentDate.toISOString().split('T')[0]);
            // Avanzar un día
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return range;
    };

    /**
     * Devuelve el objeto "markedDates" que requiere react-native-calendars
     * para mostrar el rango con estilos.
     */
    const getMarkedDates = () => {
        // Si no hay fecha inicial, no marcamos nada.
        if (!startDate) return {};

        // Si tenemos solo fecha inicial, la marcamos como start y end a la vez
        // para indicar que esa fecha está seleccionada pero no se ha definido un rango.
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

        // Si hay un rango, marcamos todas las fechas entre startDate y endDate.
        const range = getDatesRange(startDate, endDate);
        const marked: Record<string, any> = {};

        range.forEach((date, index) => {
            if (index === 0) {
                // Primer día del rango
                marked[date] = {
                    startingDay: true,
                    color: GlobalTheme.colors.main,
                    textColor: GlobalTheme.colors.white,
                };
            } else if (index === range.length - 1) {
                // Último día del rango
                marked[date] = {
                    endingDay: true,
                    color: GlobalTheme.colors.main,
                    textColor: GlobalTheme.colors.white,
                };
            } else {
                // Día intermedio del rango
                marked[date] = {
                    color: adjustColor(GlobalTheme.colors.main, +20),
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
                hideArrows={true}
                onDayPress={onDayPress}
                markingType='period' // Tipo de marcado para rango
                markedDates={getMarkedDates()}
            />
        </View>
    );
};

export default CustomCalendar;
