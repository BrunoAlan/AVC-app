import { StyleProp, Text, TextStyle } from 'react-native';

interface Props {
    style?: StyleProp<TextStyle>;
    children: string;
}
const ThemedText = ({ style, children }: Props) => {
    return <Text style={[{ textAlign: 'left' }, style]}>{children}</Text>;
};
export default ThemedText;
