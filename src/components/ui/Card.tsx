import {
    StyleSheet,
    Image,
    Pressable,
    View,
    Text,
    StyleProp,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';

import { GlobalTheme } from '@src/constants/theme/GlobalTheme';

interface CardProps {
    title?: string;
    description?: string;
    imageSource?: ImageSourcePropType;

    onPress?: () => void;

    style?: StyleProp<ViewStyle>;

    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    imageSource,
    onPress,
    style,
    children,
}) => {
    // If onPress is provided, use Pressable; otherwise, use a normal View
    const ContainerComponent = onPress ? Pressable : View;

    return (
        <ContainerComponent style={[styles.card, style]} onPress={onPress}>
            {imageSource && (
                <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode='cover'
                />
            )}
            <View style={styles.content}>
                {title && <Text style={styles.title}>{title}</Text>}
                {description && (
                    <Text style={styles.description}>{description}</Text>
                )}

                {children}
            </View>
        </ContainerComponent>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: GlobalTheme.colors.white,
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,

        // iOS shadow
        shadowColor: GlobalTheme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Android elevation
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 12,
    },
    title: {
        textAlign: 'left',
        fontSize: GlobalTheme.typography.fontSizeLG,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    description: {
        fontSize: GlobalTheme.typography.fontSizeSM,
        color: '#444',
        marginBottom: 6,
    },
});
