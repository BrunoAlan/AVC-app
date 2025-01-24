import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import { useRouter } from 'expo-router';
import CustomDrawer from '@/components/drawer/DrawerContent';
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
                }}
                drawerContent={CustomDrawer}
            >
                <Drawer.Screen
                    name='(tabs)'
                    options={{
                        drawerLabel: 'Tabs',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
