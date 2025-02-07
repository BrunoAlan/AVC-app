import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { type PropertiesResponse } from '@src/infrastructure/interfaces/properties/properties.interface';

interface Options {
    channelId: string;
    checkIn: string;
    checkOut: string;
    country: string | null;
    customClassification: string | null;
}

export const getProperties = async ({
    channelId,
    checkIn,
    checkOut,
    country,
    customClassification,
}: Options): Promise<PropertiesResponse> => {
    try {
        const { data } = await bookingFlowApi.post(
            `/v2/ee/channels/${channelId}/offers`,
            {
                checkIn,
                checkOut,
                occupancy: [
                    {
                        adults: 2,
                        children: [],
                    },
                ],
                promotionalCode: 'EliteRubyClient',
                currency: 'All',
                user: {
                    ipAddress: '190.195.83.218',
                    userAgent:
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
                    language: 'es',
                },
                filters: {
                    distanceUnitOfMeasure: 'KM',
                    propertyName: '',
                    minPrice: null,
                    maxPrice: null,
                    stars: null,
                    mealPlans: null,
                    propertyTypes: null,
                    countries: country ? [country] : [],
                    distance: null,
                    latitude: null,
                    longitude: null,
                    geo: {
                        customClassification: customClassification,
                    },
                },
                priceDisplayMode: 'stay',
                priceCalcMode: 'asInPricelist',
                pageSize: 15,
                page: 1,
                sourceContext: 'Desktop/Owner',
                sortOrder: 'PriceAsc',
                bonusBreakSelected: false,
                hotelOrder: true,
                alternativeCheckinCount: 1,
                alternativeCheckinDaysOfWeek: [
                    'MONDAY',
                    'TUESDAY',
                    'WEDNESDAY',
                    'THURSDAY',
                    'FRIDAY',
                    'SATURDAY',
                    'SUNDAY',
                ],
                displayArrivalsWithNoAvail: true,
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting properties');
    }
};
