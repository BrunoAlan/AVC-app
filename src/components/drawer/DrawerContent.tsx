import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@components';

export const CustomDrawer = (props: DrawerContentComponentProps) => {
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
                    <ThemedText>Logout</ThemedText>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
};
