import { useQuery } from '@tanstack/react-query';
import { getContracts } from '../actions/contracts/get-contracts';

export const useContracts = () => {
    const {
        isLoading,
        isError,
        error,
        data: contracts,
        isFetching,
    } = useQuery({
        queryKey: ['contract'],
        queryFn: getContracts,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        contracts,
        isFetching,
    };
};
