import bookingFlowApi from '@/src/config/api/BookingFlowApi';
import { type UserResponse } from '@/src/infrastructure/interfaces/user/user.response';

export const getUser = async (): Promise<UserResponse | null> => {
    try {
        const response = await bookingFlowApi.get('/v2/users');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
