import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
    Pressable,
    View,
    Text,
    type PressableStateCallbackType,
} from 'react-native';
import { cn } from '~/lib/utils';
import { TextClassContext } from '~/components/ui/text';

const buttonVariants = cva(
    'flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white active:bg-primary-dark',
                destructive: 'bg-red-500 text-white active:bg-red-600',
                outline:
                    'border border-gray-300 bg-transparent text-black active:bg-gray-100',
                secondary: 'bg-gray-200 text-black active:bg-gray-300',
                ghost: 'bg-transparent text-black active:bg-gray-100',
                link: 'underline text-primary active:text-primary-dark',
            },
            size: {
                default: 'h-12 px-4',
                sm: 'h-10 px-3 text-sm',
                lg: 'h-14 px-6 text-lg',
                icon: 'h-12 w-12',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const buttonTextVariants = cva('text-center font-medium', {
    variants: {
        variant: {
            default: 'text-white',
            destructive: 'text-white',
            outline: 'text-black',
            secondary: 'text-black',
            ghost: 'text-black',
            link: 'text-primary',
        },
        size: {
            default: 'text-base',
            sm: 'text-sm',
            lg: 'text-lg',
            icon: 'text-base',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof buttonVariants> & {
        icon?: React.ReactNode;
        iconPosition?: 'left' | 'right';
        children?:
            | React.ReactNode
            | ((state: PressableStateCallbackType) => React.ReactNode);
    };

const Button = React.forwardRef<
    React.ElementRef<typeof Pressable>,
    ButtonProps
>(
    (
        {
            className,
            variant,
            size,
            icon,
            iconPosition = 'left',
            children,
            ...props
        },
        ref
    ) => {
        return (
            <TextClassContext.Provider
                value={buttonTextVariants({
                    variant,
                    size,
                })}
            >
                <Pressable
                    className={cn(
                        'flex-row items-center gap-2', // Horizontal alignment
                        props.disabled && 'opacity-50',
                        buttonVariants({ variant, size, className })
                    )}
                    ref={ref}
                    {...props}
                >
                    {icon && iconPosition === 'left' && (
                        <View className='mr-2'>{icon}</View> // Margin for spacing
                    )}
                    <Text className={cn(buttonTextVariants({ variant, size }))}>
                        {typeof children === 'function'
                            ? children({
                                  pressed: false,
                                  hovered: false,
                              })
                            : children}
                    </Text>
                    {icon && iconPosition === 'right' && (
                        <View className='ml-2'>{icon}</View>
                    )}
                </Pressable>
            </TextClassContext.Provider>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
