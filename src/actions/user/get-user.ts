import bookingFlowApi from '@/src/config/api/BookingFlowApi';
import { type UserResponse } from '@src/infrastructure/interfaces/user/user.interface';

export const getUser = async (): Promise<UserResponse> => {
    try {
        const response = await bookingFlowApi.get('/v2/users');
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting user');
    }
};
