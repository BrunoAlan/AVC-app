export interface ConfigurationResponse {
    isActive: boolean;
    currency: string;
    parentChannel: string;
    timezone: string;
    paymentProviders: PaymentProvider[];
    paymentProvidersUsage: PaymentProvidersUsage;
    name: string;
    maxLeadTime: number;
    allocationTimeDelta: number;
    disableThirdPartySystems: boolean;
    adminPanelURL: string;
    destinations: boolean;
    autocompleteFilter: boolean;
    bankingSupported: boolean;
    welcomePageEnabled: boolean;
    new: boolean;
    newPointsConversionSystem: boolean;
    showAccountStatement: boolean;
    showPaymentOptionsSlider: boolean;
}

export interface PaymentProvider {
    requiredCustomerFields: string[];
    logo: null;
    methods: null;
    id: number;
    code: string;
}

export interface PaymentProvidersUsage {
    conversions: number;
    memberships: number;
    reservations: number;
}
