import bookingFlowApi from '@/src/config/api/BookingFlowApi';

export const getUser = async () => {
    try {
        const response = await bookingFlowApi.get('/v2/users');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
