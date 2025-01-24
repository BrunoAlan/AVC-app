import { StorageAdapter } from '@/src/config/adapters/storage-adapter';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { Button } from '../ui/button';

const CustomDrawer = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}>
            <View className='flex-1 flex flex-col '>
                <View className='flex justify-center items-center mx-3 p-10 mb-10 h-40 rounded-xl bg-[#b4a258]'>
                    <View className='flex justify-center items-center bg-white rounded-full h-24 w-24'>
                        <Text className='text-primary font-bold text-3xl'>
                            AVC
                        </Text>
                    </View>
                </View>

                <DrawerItemList {...props} />

                <View className='px-4 py-3'>
                    <Button
                        variant={'outline'}
                        onPress={async () => {
                            await StorageAdapter.removeItem('token');
                            console.log(await StorageAdapter.getItem('token'));
                            router.replace('/');
                        }}
                    >
                        <Text>Logout</Text>
                    </Button>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;
