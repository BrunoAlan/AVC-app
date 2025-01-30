import bookingFlowApi from '@src/config/api/BookingFlowApi';

export const getProperties = async (channelId: string): Promise<any> => {
    try {
        const { data } = await bookingFlowApi.post(
            `/v2/ee/channels/${channelId}/offers`,
            {
                isMobile: true,
                checkIn: '2025-02-04',
                checkOut: '2025-02-11',
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
                    countries: ['TH'],
                    distance: null,
                    latitude: null,
                    longitude: null,
                    geo: {
                        regionType: null,
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
