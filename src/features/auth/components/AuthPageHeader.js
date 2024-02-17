import { View, StyleSheet, Text } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR } from 'src/shared/constants/colorConstants';

function AuthPageHeader({ title, subtitle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titelText}>{title}</Text>
            <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
    );
}

export default AuthPageHeader;

const styles = StyleSheet.create({
    titelText: {
        fontSize: FONT_SIZE.large,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: FONT_SIZE.small,
        color: GREY_COLOR.medium,

    }
})