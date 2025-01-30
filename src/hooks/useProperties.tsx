import { getProperties } from '@src/actions/properties/get-properties';
import { useQuery } from '@tanstack/react-query';

export const useProperties = (channelId: string) => {
    const {
        isLoading,
        isError,
        error,
        data: properties,
        isFetching,
    } = useQuery({
        queryKey: ['property', channelId],
        queryFn: () => getProperties(channelId),
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
