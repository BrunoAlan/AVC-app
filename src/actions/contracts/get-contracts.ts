import bookingFlowApi from '@/src/config/api/BookingFlowApi';
import {
    Contract,
    type ContractResponse,
} from '@/src/infrastructure/interfaces/contract/contract.response';

export const getContracts = async (): Promise<Contract[]> => {
    try {
        const { data } = await bookingFlowApi.get<ContractResponse>(
            '/users/contracts',
            {
                params: {
                    isMobile: true,
                },
            }
        );
        return data.contracts;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting contracts');
    }
};
