export interface AccountResponse {
    primary: Ary;
    secondary: Ary;
    accountInformation: AccountInformation;
    ownerDataForAgent: OwnerDataForAgent;
    armnetId: string;
    salesForceId: string;
    channelId: string;
    bonusBreak: BonusBreak;
    clientPromoCode: string;
    agentPromoCode: string;
    hasMultipleContracts: boolean;
    ledger: number;
}

export interface AccountInformation {
    country: string;
    membership: string;
    city: string;
    address1: string;
    state: string;
    zipCode: string;
    tierCode: string;
    company: null;
    tags: any[];
    address2: string;
    id: number;
    legacyId: string;
    status: string;
    department: null;
    referral: null;
    type: string;
}

export interface BonusBreak {
    id: number;
    cutoff: number;
}

export interface OwnerDataForAgent {}

export interface Ary {
    id: number;
    email: string;
    phone: string;
    loginToken: string;
    firstLogin: Date | null;
    pictureUrl: string;
    tags: any[];
    language: string;
    mobile: string;
    lastName: string;
    birthday: Date;
    extraAttributes: ExtraAttributes;
    relationships: any[];
    firstName: string;
    country: string;
    membership: string;
    city: string;
    address1: string;
    state: string;
    zipCode: string;
    tierCode: string;
    company: null;
    userLevel: string;
}

export interface ExtraAttributes {
    userBool: boolean;
    userList: string;
    qaDisable: boolean;
    userFloat: number;
    userString: string;
    qaHidden: number;
    userDate: Date;
    userInteger: number;
    uniqueSalesforceId: string;
}
