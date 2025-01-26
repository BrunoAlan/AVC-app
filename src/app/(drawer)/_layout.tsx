import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '@/src/components/drawer/DrawerContent';
import { Colors } from '@src/constants/theme/Colors';
export default function Layout() {
    return (
        <GestureHandlerRootView>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerItemStyle: {
                        marginHorizontal: 15,
                        borderRadius: 0,
                    },
                    drawerActiveTintColor: Colors.main,
                }}
                drawerContent={CustomDrawer}
            >
                <Drawer.Screen
                    name='(tabs)'
                    options={{
                        drawerLabel: 'Tabs',
                        drawerItemStyle: {
                            display: 'none',
                        },
                    }}
                />
                <Drawer.Screen
                    name='profile'
                    options={{
                        drawerLabel: 'Profile',
                        headerShadowVisible: true,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
