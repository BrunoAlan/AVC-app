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

export default function Layout() {
    const router = useRouter();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => (
                    <DrawerContentScrollView
                        className='flex flex-1 bg-red-300 px-4'
                        {...props}
                    >
                        <DrawerItemList {...props} />
                        <Button
                            className='self-end'
                            variant={'outline'}
                            onPress={async () => {
                                await StorageAdapter.removeItem('token');
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
