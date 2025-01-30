import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, PressableProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@src/hooks/useThemeColor';

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

// 1. Derive the ref type for Pressable:
type PressableRef = React.ElementRef<typeof Pressable>;

const ThemedButton = React.forwardRef<PressableRef, Props>(
    ({ children, icon, ...rest }, ref) => {
        const primaryColor = useThemeColor({}, 'primary');
        return (
            <Pressable
                ref={ref}
                {...rest}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? primaryColor + '90'
                            : primaryColor,
                    },
                    styles.button,
                ]}
            >
                <Text style={{ color: 'white' }}>{children}</Text>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color='white'
                        style={{ marginHorizontal: 5 }}
                    />
                )}
            </Pressable>
        );
    }
);

export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
