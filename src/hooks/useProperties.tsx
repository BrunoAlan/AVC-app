import { getProperties } from '@src/actions/properties/get-properties';
import { useQuery } from '@tanstack/react-query';

interface Options {
    channelId: string;
    checkIn: string;
    checkOut: string;
    country: string | null;
    customClassification: string | null;
}

export const useProperties = ({
    channelId,
    checkIn,
    checkOut,
    country,
    customClassification,
}: Options) => {
    const {
        isLoading,
        isError,
        error,
        data: properties,
        isFetching,
    } = useQuery({
        enabled:
            !!channelId &&
            !!checkIn &&
            !!checkOut &&
            (!!country || !!customClassification),
        queryKey: [
            'property',
            { channelId, checkIn, checkOut, country, customClassification },
        ],
        queryFn: () =>
            getProperties({
                channelId,
                checkIn,
                checkOut,
                country,
                customClassification,
            }),

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
