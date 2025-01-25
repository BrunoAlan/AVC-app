export interface ContractResponse {
    contracts: Contract[];
}

export interface Contract {
    id: number;
    tier: string;
    contractType: string;
    club: string;
    channelId: string;
    contractTypeCode: string;
    contractBaseId: number;
}
