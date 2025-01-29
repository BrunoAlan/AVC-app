import React, { forwardRef } from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';
import { GlobalTheme } from '@src/constants/theme/GlobalTheme';

type ButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    disabled?: boolean;
    loading?: boolean;
};

const Button = forwardRef<any, ButtonProps>(
    (
        {
            title,
            onPress,
            variant = 'primary',
            disabled = false,
            loading = false,
        },
        ref
    ) => {
        const buttonStyles: ViewStyle[] = [styles.button];
        const textStyles: TextStyle[] = [styles.text];

        switch (variant) {
            case 'secondary':
                buttonStyles.push(styles.buttonSecondary);
                textStyles.push(styles.textSecondary);
                break;
            case 'danger':
                buttonStyles.push(styles.buttonDanger);
                textStyles.push(styles.textDanger);
                break;
            case 'success':
                buttonStyles.push(styles.buttonSuccess);
                textStyles.push(styles.textSuccess);
                break;
            default:
                buttonStyles.push(styles.buttonPrimary);
                textStyles.push(styles.textPrimary);
        }

        if (disabled) {
            buttonStyles.push(styles.buttonDisabled);
            textStyles.push(styles.textDisabled);
        }

        return (
            <Pressable
                ref={ref}
                style={({ pressed }) => [
                    ...buttonStyles,
                    pressed && !disabled && !loading
                        ? styles.buttonPressed
                        : null,
                ]}
                onPress={onPress}
                disabled={disabled || loading}
            >
                {loading ? (
                    <ActivityIndicator color='#fff' />
                ) : (
                    <Text style={textStyles}>{title}</Text>
                )}
            </Pressable>
        );
    }
);

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    buttonPrimary: {
        backgroundColor: GlobalTheme.colors.main,
    },
    buttonSecondary: {
        backgroundColor: GlobalTheme.colors.darkGray,
    },
    buttonDanger: {
        backgroundColor: GlobalTheme.colors.red,
    },
    buttonSuccess: {
        backgroundColor: GlobalTheme.colors.green,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    buttonPressed: {
        opacity: 0.8,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textPrimary: {
        color: '#FFFFFF',
    },
    textSecondary: {
        color: '#FFFFFF',
    },
    textDanger: {
        color: '#FFFFFF',
    },
    textSuccess: {
        color: '#FFFFFF',
    },
    textDisabled: {
        color: '#666666',
    },
});

export default Button;
