import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';

function ActionButton({icon, text, onPress}) {
   
    return (  //Pressable is better but animation ¯\_(ツ)_/¯
        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}> 
                {icon}
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        alignItems:"center",
        margin:20
    },
    textStyle:{
        fontSize:FONT_SIZE.medium,
        color:"white",
        marginTop:5
    }
})

export default ActionButton;