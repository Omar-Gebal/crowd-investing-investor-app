import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { GREY_COLOR } from 'src/shared/constants/colorConstants';
import { AntDesign } from '@expo/vector-icons';
import { useRef, useState } from 'react';

function Field({ control, name, rules, label }) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur } }) => (
                <View>
                    <Text style={styles.labelStyle}>{label}</Text>
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
                        />
                        <TouchableOpacity onPress={() => inputRef.current.focus()}>
                            <AntDesign name="edit" size={15} color={GREY_COLOR.medium} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    inputField: {
        borderBottomWidth: 2,
        width: 220,
        padding: 0,
        marginRight: 10,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    labelStyle: {
        color: GREY_COLOR.medium,
    },
});

export default Field;
