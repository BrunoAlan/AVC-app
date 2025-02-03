import {
    QueryClient,
    QueryClientProvider as TanStackQueryClient,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    useReactQueryDevTools(queryClient);

    return (
        <TanStackQueryClient client={queryClient}>
            {children}
        </TanStackQueryClient>
    );
};

export default QueryClientProvider;
