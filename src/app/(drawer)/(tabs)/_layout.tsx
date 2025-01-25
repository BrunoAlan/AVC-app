import { Text } from '@/components/ui/text';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { Menu } from '@/lib/icons/menu';
import { Search } from '@/lib/icons/search';

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
                tabBarActiveTintColor: '#b4a258',
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Search color={focused ? '#b4a258' : 'gray'} />
                    ),
                    tabBarActiveTintColor: '#b4a258',
                }}
            />
            <Tabs.Screen name='search' options={{ title: 'Search' }} />
            <Tabs.Screen name='bookings' options={{ title: 'Bookings' }} />
            <Tabs.Screen name='my-card' options={{ title: 'My card' }} />
        </Tabs>
    );
}
