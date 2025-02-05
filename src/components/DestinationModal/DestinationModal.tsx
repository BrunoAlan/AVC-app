import {
    Country,
    Child,
    RegionsResponse,
} from '@src/infrastructure/interfaces/regions/regions.interface';
import React, { FC, useState } from 'react';
import { useSearchParamsStore } from '../../stores/searchParamsStore';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    ListRenderItem,
} from 'react-native';

// Props for the component

interface CountryCitySearchProps {
    data: RegionsResponse;
}

const CountryCitySearch: FC<CountryCitySearchProps> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { setCountry, setCustomClassification } = useSearchParamsStore();

    /**
     * Filters the list of countries and cities based on the search term.
     * - If the country name matches the search term, all its cities are returned.
     * - If the country does not match, but some of its cities do, only those matching cities are returned.
     */
    const getFilteredData = (): Country[] => {
        const { countries = [] } = data;
        const lowerSearchTerm = searchTerm.toLowerCase();

        return countries
            .map((country) => {
                const countryLabel = country.label.toLowerCase();
                const matchCountry = countryLabel.includes(lowerSearchTerm);

                // Filter cities that match the search term
                const filteredChildren = country.children.filter((city) =>
                    city.label.toLowerCase().includes(lowerSearchTerm)
                );

                // If the country name matches, return all its cities.
                // Otherwise, return only the filtered cities (if any).
                if (matchCountry || filteredChildren.length > 0) {
                    return {
                        ...country,
                        children: matchCountry
                            ? country.children
                            : filteredChildren,
                    };
                }

                return null;
            })
            .filter((country): country is Country => country !== null);
    };

    const handleClick = (item: Country | Child): void => {
        if ('children' in item) {
            setCountry(item.value);
            console.log('country', item.value);
        } else {
            setCustomClassification(item.value);
            console.log('city', item.value);
        }
    };

    const renderCountry: ListRenderItem<Country> = ({ item: country }) => (
        <View style={styles.countryContainer}>
            <Text
                onPress={() => handleClick(country)}
                style={styles.countryLabel}
            >
                {country.label}
            </Text>
            {country.children.map((city) => (
                <Text
                    onPress={() => handleClick(city)}
                    key={city.value}
                    style={styles.cityLabel}
                >
                    {city.label}
                </Text>
            ))}
        </View>
    );

    // Only compute filtered data if the user has entered something
    const filteredData = searchTerm ? getFilteredData() : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Country & City Search</Text>
            <TextInput
                style={styles.searchInput}
                placeholder='Type a country or city...'
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            {/* Show results only if the user has typed something */}
            {searchTerm.length > 0 && (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.value}
                    renderItem={renderCountry}
                />
            )}
        </View>
    );
};

export default CountryCitySearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    countryContainer: {
        marginBottom: 12,
    },
    countryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cityLabel: {
        fontSize: 14,
        marginLeft: 16,
        color: '#333',
    },
});
