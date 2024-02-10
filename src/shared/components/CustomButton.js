import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { GREEN_COLOR, GREY_COLOR } from 'src/shared/constants/colorConstants';

function CustomButton({onPress, title}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed ? GREY_COLOR.light : GREEN_COLOR,
            }]} >
            <Text style={styles.buttontxt}>{title}</Text>
        </Pressable>
       
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:GREEN_COLOR,
        textAlign:"center",
        padding:16,
        borderRadius:50
    },
    buttontxt:{
        color:"white",
        textAlign:"center",
        fontSize:FONT_SIZE.medium
    }
})


export default CustomButton;