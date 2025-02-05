import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { type ConfigurationResponse } from '@src/infrastructure/interfaces/configuration/configuration.interface';

export const getConfiguration = async (): Promise<ConfigurationResponse> => {
    try {
        const { data } = await bookingFlowApi.get<ConfigurationResponse>(
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
