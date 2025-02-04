import { getRegions } from '@src/actions/regions/get-regions';
import { useQuery } from '@tanstack/react-query';

interface Options {
    channelId: string;
    language: string;
}

export const useRegions = ({ channelId, language }: Options) => {
    const {
        isLoading,
        isError,
        error,
        data: regions,
        isFetching,
    } = useQuery({
        queryKey: ['regions', { channelId, language }],
        queryFn: () =>
            getRegions({
                channelId,
                language,
            }),

        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        regions,
        isFetching,
    };
};
