import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function CampaignCard({imgUri,description}) {
   
    return (
        <Pressable style={styles.container}>
            <Image source={{uri:imgUri}}  style={styles.imgStyle}/>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container:{
        padding:"2%",
        elevation:5,
        zIndex:5,
        backgroundColor:"white",
        flex:1,
        justifyContent: 'center',
    },
    txtStyle:{
        textAlign: 'center', 
        fontSize: 30 
    },
    imgStyle:{
        width:"100%",
        height:"100%",
        borderRadius:5
    }
})

export default CampaignCard;