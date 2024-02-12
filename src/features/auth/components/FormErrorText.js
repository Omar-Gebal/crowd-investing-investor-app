import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { ERROR_COLOR, GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

function FormErrorText({ text }) {
    return (
        <Text style={styles.error}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: ERROR_COLOR,
        marginLeft: 20,
        marginTop: 5
    }
})


export default FormErrorText;