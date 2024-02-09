import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import styles from 'src/shared/constants/style_constants';

function CustomButton({onPress, title}) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.buttontxt}>{title}</Text>
        </Pressable>
       
    );
}



export default CustomButton;