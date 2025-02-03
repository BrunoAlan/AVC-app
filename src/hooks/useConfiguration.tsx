import { getConfiguration } from '@src/actions/configuration/get-configuration';
import { useQuery } from '@tanstack/react-query';

export const useConfiguration = () => {
    const {
        isLoading,
        isError,
        error,
        data: configuration,
        isFetching,
    } = useQuery({
        queryKey: ['configuration'],
        queryFn: getConfiguration,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        configuration,
        isFetching,
    };
};
