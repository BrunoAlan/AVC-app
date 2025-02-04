export interface RegionsResponse {
    countries: Country[];
    filtersAvailable: any[];
}

export interface Country {
    label: string;
    value: string;
    englishValue: string;
    children: Child[];
}

export interface Child {
    code: string;
    label: string;
    value: string;
    englishValue: string;
    filters: any[];
}
