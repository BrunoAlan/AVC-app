import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { type RegionsResponse } from '@src/infrastructure/interfaces/regions/regions.response';

interface Options {
    channelId: string;
    language: string;
}

export const getRegions = async ({
    channelId,
    language = 'en',
}: Options): Promise<RegionsResponse> => {
    try {
        const { data } = await bookingFlowApi.post('/static/regions/v2', {
            channelId,
            user: {
                language,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting regions');
    }
};
