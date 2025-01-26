import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Tabs } from 'expo-router/tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@src/constants/theme/Colors';

const TABS: {
    name: string;
    title: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
}[] = [
    {
        name: 'home',
        title: 'Home',
        icon: 'home-outline',
    },
    {
        name: 'search',
        title: 'Search',
        icon: 'search-outline',
    },
    {
        name: 'bookings',
        title: 'Bookings',
        icon: 'calendar-outline',
    },
    {
        name: 'my-card',
        title: 'My card',
        icon: 'card-outline',
    },
];

export default function TabsLayout() {
    const navigation = useNavigation();
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                headerLeft: () => (
                    <Ionicons
                        name='menu-outline'
                        color={Colors.darkGray}
                        size={32}
                        onPress={() => {
                            navigation.dispatch(DrawerActions.toggleDrawer);
                        }}
                    ></Ionicons>
                ),
                tabBarActiveTintColor: Colors.main,
            }}
        >
            {TABS.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarActiveTintColor: Colors.main,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name={tab.icon}
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            ))}
        </Tabs>
    );
}
