export interface PropertiesResponse {
    offers: any[];
    properties: Property[];
    notAvailableProperties: NotAvailableProperty[];
    priceRangeMin: number;
    priceRangeMax: number;
    pages: number;
    totalResults: number;
    logKey: string;
    hasUncroppedImages: boolean;
}

export interface NotAvailableProperty {
    code: string;
    name: string;
    searchBucket: null;
    stars: null;
    location: Location;
    mainImage: MainImage;
    amenities: Amenity[];
    priceWithExtraFees: null;
    marketing: Marketing;
    description: null | string;
    shouldUpgrade: boolean;
    currencyCode: null;
    guestCurrencyCode: null;
    trustYouId: null;
    alternativeOffers: any[];
}

export interface Amenity {
    code: string;
    text: string;
    icon: string;
    defaultIcon: DefaultIcon;
}

export enum DefaultIcon {
    BfIconCheck = 'bf-icon-check',
}

export interface Location {
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    distance: null;
}

export interface MainImage {
    url: string;
    title: null;
    cropped: boolean;
}

export interface Marketing {
    promotion: boolean;
    mealPlan: null | string;
    firstClassification: FirstClassification;
    classificationFirstItems: FirstClassification[];
    mealPlanCode?: string;
}

export interface FirstClassification {
    code: string;
    detail: null;
    title: string;
    url?: string;
    reference?: string;
}

export interface Property {
    code: string;
    name: string;
    searchBucket: null;
    stars: null;
    location: Location;
    mainImage: MainImage;
    amenities: Amenity[];
    price: number;
    originalPrice?: number;
    priceWithExtraFees: null;
    discount?: number;
    marketing: Marketing;
    description: null | string;
    shouldUpgrade: boolean;
    currencyCode: string;
    guestCurrencyCode: string;
    alternativeTotals: string[];
    trustYouId: null;
    alternativeOffers: AlternativeOffer[];
}

export interface AlternativeOffer {
    checkIn: Date;
    checkOut: Date;
    price: number;
    priceWithExtraFees: null;
    los: number;
    shouldUpgrade: boolean;
}
