import { create } from 'zustand';

interface ContractStore {
    selectedContract: string;
    setSelectedContract: (contract: string) => void;
}

export const useContractStore = create<ContractStore>((set) => ({
    selectedContract: '',
    setSelectedContract: (contract) => set({ selectedContract: contract }),
}));
