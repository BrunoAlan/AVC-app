import { useQuery } from '@tanstack/react-query';
import { getContract } from '../actions/contracts/get-contract';

export const useContracts = () => {
    const {
        isLoading,
        isError,
        error,
        data: contracts,
        isFetching,
    } = useQuery({
        queryKey: ['contract'],
        queryFn: getContract,
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
