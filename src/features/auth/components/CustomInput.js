import { Text, TextInput, View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";



function CustomInput({control, name, placeHolder, secureTextEntry, required}) {
    return (
        <View>
            <Controller 
                control={control}
                name={name}
                rules={{required: required}}
                render ={({field: {value, onChange, onBlur}}) => (
                    <View style={[styles.inputField]}>
                    <TextInput 
                     value={value}
                     onChangeText={onChange}
                     onBlue={onBlur}
                     placeholder={placeHolder}
                     secureTextEntry={secureTextEntry}/>
                     </View>
                )}

            />
        </View>
    );

}
const styles = StyleSheet.create({
    inputField:{
        borderWidth:1,
        borderColor:GREY_COLOR.light,
        borderRadius: 60,
        padding:16,
        paddingLeft:20,
    }
})

export default CustomInput;