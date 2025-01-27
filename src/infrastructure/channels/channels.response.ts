export interface ChannelsResponse {
    propertyInfo: null;
    channelSettings: ChannelSettings;
    styleCustomizations: StyleCustomizations;
}

export interface ChannelSettings {
    autocomplete: Autocomplete;
    offersSortingDefault: OffersSortingDefault[];
    onlyAvailableHotels: boolean;
    offersSortingAvailableFirst: boolean;
    couponVoucherTerm: string;
    googleKey: null;
    showPriceCalcSwitch: boolean;
    showPriceDisplaySwitch: boolean;
    activeBookingEngine: string;
    currencies: Currencies;
    defaultOccupancyConf: DefaultOccupancyConf;
    checkIn: Date;
    checkOut: Date;
    languages: Languages;
    currencyDisplay: string;
    customLabels: CustomLabels;
    minLengthOfStay: number;
    maxLengthOfStay: number;
    defaultLengthOfStay: number;
    citySearchDistanceInMeter: number;
    offersSortingHotelOrder: boolean;
    minNightOffset: number;
    channelRequiresAuthorization: boolean;
    couponIntegration: string;
    showDailyPriceBreakdown: boolean;
    vouchersEnabled: boolean;
    multiProperty: boolean;
    availableLanguages: string[];
    language: string;
    name: string;
    id: string;
    priceDropEnabled: boolean;
    priceDropPercentage: null;
    priceDropMaxPercentage: null;
    promotionCodeEnabled: boolean;
    servicesEnabled: boolean;
    priceCalcMode: string;
    priceDisplayMode: string;
    country: string;
    shoppingCartPriceCalcMode: string;
    maxCheckoutOffset: number;
    minOccupancy: number;
    maxOccupancy: number;
    childrenEnabled: boolean;
    maxChildAge: number;
    minChildAge: number;
    maxRoomsPerBooking: number;
    userDeviceType: string;
    associatedCountries: AssociatedCountries;
    favicon: null;
    marketing: Marketing;
    enabledTrackingModules: EnabledTrackingModule[];
    isProduction: boolean;
    cookieBannerDisplay: string;
    showCookieBanner: boolean;
    europeanUser: boolean;
    offersSorting: string;
    availableCurrencies: AvailableCurrency[];
    waitingListEnabled: boolean;
    logo: Logo;
    robotsNoIndex: boolean;
    blackoutPeriods: any[];
    cookieOptIn: boolean;
    recommendedSortCriteria: string;
    landingPageMap: LandingPageMap;
    autoCompleteFields: string[];
    ntpDomain: string;
    alternativeOffers: AlternativeOffers;
    ipAddress: string;
    casURL: string;
}

export interface AlternativeOffers {
    displayArrivalsWithNoAvail: boolean;
    filterAndSearchSetting: string;
    alternativeCheckinCount: number;
    alternativeCheckinDaysOfWeek: string[];
    resultExpandedByDefault: boolean;
    active: boolean;
    label: null;
}

export interface AssociatedCountries {
    AT: string;
    AU: string;
    TH: string;
    US: string;
}

export interface Autocomplete {
    visible: boolean;
    types: string[];
    citySearchDistanceMode: string;
    distanceUnitOfMeasure: string;
    customClassificationsFilters: string[];
    citySearchBucketsStopCount: null;
    citySearchDistanceMaxKm: number;
    citySearchDistanceMaxMiles: number;
    noResultsMessageDistanceEnabled: boolean;
    citySearchDistanceKm: number;
    citySearchDistanceMiles: number;
    citySearchDistanceBucketsKm: number[];
    citySearchDistanceBucketsMiles: number[];
}

export interface AvailableCurrency {
    currency: string;
    exchangeRate: number;
}

export interface Currencies {
    user: Active;
    active: Active;
    available: Active[];
}

export interface Active {
    code: string;
    symbol: string;
}

export interface CustomLabels {}

export interface DefaultOccupancyConf {
    adults: number;
    children: any[];
}

export interface EnabledTrackingModule {
    trackingModuleId: string;
    groupId: string;
    apiToken: string;
    trackingEnvironment: string;
}

export interface LandingPageMap {
    enabled: boolean;
    title: string;
    teaser: string;
}

export interface Languages {
    available: string[];
    active: string;
}

export interface Logo {
    url: string;
    title: string;
    customLink: string;
    mobileLogoUrl: null;
}

export interface Marketing {
    bookingIncentiveReservationFormat: null;
    bookingIncentiveRoomThreshold: number;
    bookingIncentiveCheckPeriod: number;
}

export interface OffersSortingDefault {
    sortCriterion: string;
    sortOrder: string;
}

export interface StyleCustomizations {
    styles: string;
}
