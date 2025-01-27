import { getChannels } from '@src/actions/channels/get-channels';
import { useQuery } from '@tanstack/react-query';

export const useChannels = () => {
    const {
        isLoading,
        isError,
        error,
        data: channels,
        isFetching,
    } = useQuery({
        queryKey: ['channels'],
        queryFn: getChannels,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        channels,
        isFetching,
    };
};
