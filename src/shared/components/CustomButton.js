import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { PRIMARY_COLOR, GREY_COLOR } from 'src/shared/constants/colorConstants';

function CustomButton({ onPress, title }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.button,
            {
                backgroundColor: pressed ? GREY_COLOR.light : PRIMARY_COLOR.main_lighter,
            }]} >
            <Text style={styles.buttontxt}>{title}</Text>
        </Pressable>

    );
}
const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR.main_lighter,
        height: 50,
        borderRadius: 50
    },
    buttontxt: {
        color: "white",
        textAlign: "center",
        fontSize: FONT_SIZE.medium
    }
})


export default CustomButton;