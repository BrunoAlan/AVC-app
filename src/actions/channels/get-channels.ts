import * as Network from 'expo-network';
import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { type ChannelsResponse } from '@src/infrastructure/interfaces/channels/channels.interface';

export const getChannels = async () => {
    const domain = process.env.EXPO_PUBLIC_DOMAIN_URL;

    try {
        const userIp = await Network.getIpAddressAsync();
        const { data } = await bookingFlowApi.post<ChannelsResponse>(
            '/channels',
            {
                domain,
                user: {
                    ipAddress: userIp,
                    userAgent:
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting channels');
    }
};
