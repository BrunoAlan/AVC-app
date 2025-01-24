import { Text } from '@/components/ui/text';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

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
                    >
                        Hamb
                    </Text>
                ),
            }}
        >
            <Tabs.Screen name='home' options={{ title: 'Home' }} />
            <Tabs.Screen name='search' options={{ title: 'Search' }} />
            <Tabs.Screen name='bookings' options={{ title: 'Bookings' }} />
            <Tabs.Screen name='my-card' options={{ title: 'My card' }} />
        </Tabs>
    );
}
