import bookingFlowApi from '@src/config/api/BookingFlowApi';
import { ChannelsResponse } from '@src/infrastructure/channels/channels.response';

export const getChannels = async () => {
    try {
        const { data } = await bookingFlowApi.get<ChannelResponse>('/channels');
        return data.channelSettings;
    } catch (error) {
        console.error(error);
        return [];
    }
};
