import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ContractStore {
    selectedContract: number | null;
    setSelectedContract: (contract: number) => void;
}

const storeAPI: StateCreator<ContractStore, [['zustand/devtools', never]]> = (
    set
) => ({
    selectedContract: null,
    setSelectedContract: (contract) => set({ selectedContract: contract }),
});

export const useContractStore = create<ContractStore>()(
    devtools(storeAPI, { name: 'contract' })
);
