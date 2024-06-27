import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";
import { GREY_COLOR } from "src/shared/constants/colorConstants";
import { AntDesign } from '@expo/vector-icons';
import { useRef, useState } from "react";


function Field({ control, name, placeholder,rules}) {
    //cant make an on focus animation. rip
    //making edit button functional not done

    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputFieldContainer}>
                <TextInput
                    ref={inputRef}
                     style={[
                    styles.inputField,
                    { borderBottomColor: isFocused ? '#006cfa' : 'black' }
                    ]}
                    onFocus={() => setIsFocused(true)}
                    value={value}
                    onChangeText={onChange}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    placeholder={placeholder}
                />
                <TouchableOpacity onPress={() => inputRef.current.focus()}>
                    <AntDesign name="edit" size={15} color={GREY_COLOR.medium} />
                </TouchableOpacity>
            </View>
        )}
    />
    );
    
}
const styles = StyleSheet.create({
    inputField:{
      borderBottomWidth:2,
      width:220,
      padding:0,
      marginRight:10
    },
    inputFieldContainer:{
        flexDirection:"row",
        alignItems:"baseline",
      
    }
})
export default Field;