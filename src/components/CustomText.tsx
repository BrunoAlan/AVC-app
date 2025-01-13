import { Text } from 'react-native';

interface Props {
    children: string;
    style?: object;
}
export const CustomText = ({ children, style }: Props) => {
    return (
        <Text
            style={{
                textAlign: 'left',
                ...style,
            }}
        >
            {children}
        </Text>
    );
};
