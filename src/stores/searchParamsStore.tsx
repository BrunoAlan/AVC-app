import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Occupancy = {
    adults: number;
    children: number[];
};

interface SearchParamsState {
    checkIn: string;
    checkOut: string;
    occupancy: Occupancy[];
    promotionalCode: string;
    country: string | null;
    customClassification: string | null;
}
interface SearchParamsActions {
    setCheckIn: (checkIn: string) => void;
    setCheckOut: (checkOut: string) => void;
    setOccupancy: (occupancy: Occupancy[]) => void;
    setCountry: (country: string) => void;
    setCustomClassification: (customClassification: string) => void;
}

const storeAPI: StateCreator<
    SearchParamsState & SearchParamsActions,
    [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
    checkIn: '',
    checkOut: '',
    occupancy: [{ adults: 1, children: [] }],
    promotionalCode: '',
    country: null,
    customClassification: null,

    setCheckIn: (checkIn) =>
        set((state) => {
            state.checkIn = checkIn;
        }),

    setCheckOut: (checkOut) =>
        set((state) => {
            state.checkOut = checkOut;
        }),

    setOccupancy: (occupancy) =>
        set((state) => {
            state.occupancy = occupancy;
        }),

    setCountry: (country: string) =>
        set((state) => {
            state.country = country;
            state.customClassification = null;
        }),

    setCustomClassification: (customClassification: string) =>
        set(
            (state) => {
                state.country = null;
                state.customClassification = customClassification;
            },
            false,
            'setCustomClassification'
        ),
});

export const useSearchParamsStore = create<
    SearchParamsState & SearchParamsActions
>()(devtools(immer(storeAPI), { name: 'searchParams' }));
