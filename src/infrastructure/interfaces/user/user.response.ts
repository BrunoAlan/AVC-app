export interface UserResponse {
    username: string;
    channelId: string;
    currency: Currency;
    avatar: string;
    id: number;
    totalInCurrency: number;
    accountLevel: string;
    armnetId: string;
    salesForceId: string;
    salesForceIframe: string;
    salesForceIframeByLanguage: SalesForceIframeByLanguage;
    clientPromoCode: string;
    userId: number;
    legacyId: string;
    email: string;
    hasMultipleContracts: boolean;
    exchangeModuleMemberId: null;
    liveChatUrl: string;
    liveChatEnabled: boolean;
    bookingModificationsEnabled: boolean;
    useOldBookingSystem: boolean;
    role: string;
    logoutUrl: string;
}

export interface Currency {
    type: string;
    code: string;
    symbol: string;
    fractionDigits: number;
}

export interface SalesForceIframeByLanguage {
    EN: string;
    TH: string;
    ZH: string;
    JA: string;
}
