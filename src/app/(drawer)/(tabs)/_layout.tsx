import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Text } from 'react-native';

export default function TabsLayout() {
    const navigation = useNavigation();
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                headerLeft: () => (
                    <Text
                        onPress={() => {
                            navigation.dispatch(DrawerActions.toggleDrawer);
                        }}
                    />
                ),
                tabBarActiveTintColor: '#b4a258',
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarActiveTintColor: '#b4a258',
                }}
            />
            <Tabs.Screen name='search' options={{ title: 'Search' }} />
            <Tabs.Screen name='bookings' options={{ title: 'Bookings' }} />
            <Tabs.Screen name='my-card' options={{ title: 'My card' }} />
        </Tabs>
    );
}
