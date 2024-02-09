import { Text, TextInput, View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import styles from "src/shared/constants/style_constants";


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


export default CustomInput;