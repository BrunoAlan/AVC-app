import { Text } from '@/components/ui/text';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Menu } from '@/lib/icons/menu';

export default function TabsLayout() {
    const navigation = useNavigation();
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                headerLeft: () => (
                    <Menu
                        className='ml-4 color-black'
                        onPress={() => {
                            navigation.dispatch(DrawerActions.toggleDrawer);
                        }}
                    />
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
