import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
    const router = useRouter();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => (
                    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
                        <DrawerItemList {...props} />
                        <Button
                            variant={'outline'}
                            onPress={async () => {
                                await StorageAdapter.removeItem('token');
                                console.log(
                                    await StorageAdapter.getItem('token')
                                );
                                router.replace('/');
                            }}
                        >
                            <Text>Logout</Text>
                        </Button>
                    </DrawerContentScrollView>
                )}
            >
                <Drawer.Screen
                    name='(tabs)'
                    options={{
                        drawerLabel: 'Tabs',
                        drawerItemStyle: { display: 'none' },
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
