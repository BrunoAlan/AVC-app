import { getAccount } from '@src/actions/account/get-account';
import { useQuery } from '@tanstack/react-query';

export const useAccount = () => {
    const {
        isLoading,
        isError,
        error,
        data: account,
        isFetching,
    } = useQuery({
        queryKey: ['account'],
        queryFn: getAccount,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60,
    });

    return {
        isLoading,
        isError,
        error,
        account,
        isFetching,
    };
};
