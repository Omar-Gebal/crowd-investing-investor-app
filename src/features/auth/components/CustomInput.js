import { Text, TextInput, View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";



function CustomInput({ control, name, placeholder, secureTextEntry, rules }) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur } }) => (
                <View style={[styles.inputField]}>
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry} />
                </View>
            )}
        />
    );
}
const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1,
        borderColor: GREY_COLOR.light,
        borderRadius: 60,
        padding: 16,
        paddingLeft: 20,
    }
})

export default CustomInput;