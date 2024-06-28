import { Text, StyleSheet } from "react-native";
import { ERROR_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

function FormErrorText({ text, marginLeft = 20 }) {
    return (
        <Text style={[styles.error, { marginLeft }]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: ERROR_COLOR.main,
        marginTop: 5
    }
})

export default FormErrorText;
