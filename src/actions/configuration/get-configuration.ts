import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { type Configuration } from '@src/infrastructure/interfaces/configuration/configuration.response';

export const getConfiguration = async (): Promise<Configuration> => {
    try {
        const { data } = await bookingFlowApi.get<Configuration>(
            '/ee/configurations',
            {
                params: {
                    'system-id': 1,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error getting configuration');
    }
};
