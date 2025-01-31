import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Occupancy = {
    adults: number;
    children: number[];
};

interface SearchParamsStore {
    checkIn: string;
    checkOut: string;
    occupancy: Occupancy[];
    promotionalCode: string;

    setCheckIn: (checkIn: string) => void;
    setCheckOut: (checkOut: string) => void;
    setOccupancy: (occupancy: Occupancy[]) => void;
}

const storeAPI: StateCreator<
    SearchParamsStore,
    [['zustand/devtools', never], ['zustand/immer', never]]
> = (set) => ({
    checkIn: '',
    checkOut: '',
    occupancy: [{ adults: 1, children: [] }],
    promotionalCode: '',

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
});

export const useSearchParamsStore = create<SearchParamsStore>()(
    devtools(immer(storeAPI), { name: 'searchParams' })
);
