import { getProperties } from '@src/actions/properties/get-properties';
import { useQuery } from '@tanstack/react-query';

interface Options {
    channelId: string;
    checkIn: string;
    checkOut: string;
}

export const useProperties = ({ channelId, checkIn, checkOut }: Options) => {
    const {
        isLoading,
        isError,
        error,
        data: properties,
        isFetching,
    } = useQuery({
        enabled: !!channelId && !!checkIn && !!checkOut,
        queryKey: ['property', { channelId, checkIn, checkOut }],
        queryFn: () =>
            getProperties({
                channelId,
                checkIn,
                checkOut,
            }),

        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        properties,
        isFetching,
    };
};
