import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { AccountResponse } from '@src/infrastructure/interfaces/account/account.interface';

export const getAccount = async (): Promise<AccountResponse> => {
    try {
        const { data } = await bookingFlowApi.get('/v2/users/account');
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting account');
    }
};
