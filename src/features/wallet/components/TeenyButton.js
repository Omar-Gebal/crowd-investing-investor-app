import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GREY_COLOR } from 'src/shared/constants/colorConstants';

function TeenyButton({title,onPress}) {
    
    return (//Pressable is better yet again but animation ¯\_(ツ)_/¯
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonStyle:{
        borderRadius:50,
        padding:5,
        paddingHorizontal:10,
        backgroundColor:GREY_COLOR.lightest
    },
    titleStyle:{
        color:GREY_COLOR.medium,
        textAlign: "center"
    }
})

export default TeenyButton;