import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <DrawerItemList {...props} />
            <View>
                <Pressable
                    onPress={async () => {
                        await StorageAdapter.removeItem('token');
                        console.log(await StorageAdapter.getItem('token'));
                        router.replace('/');
                    }}
                >
                    <Text>Logout</Text>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;
