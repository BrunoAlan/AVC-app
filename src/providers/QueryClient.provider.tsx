import {
    QueryClient,
    QueryClientProvider as TanStackQueryClient,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    return (
        <TanStackQueryClient client={queryClient}>
            {children}
        </TanStackQueryClient>
    );
};

export default QueryClientProvider;
