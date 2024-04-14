
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { BLACK_COLOR } from 'src/shared/constants/colorConstants';
import { useState } from 'react';
function BlockOfActions(props) {
    const [hidden, setHide]= useState(false);
    
    function withdraw(){
        console.log("withdraw pressed");
    }
    function topUp(){
        console.log("TopUp pressed");
    }
    function Hide(){
        setHide(!hidden);
        console.log("Hide pressed");
    }
    return (
        <View style={styles.container}>
            <ActionButton icon={<AntDesign name="pluscircle" size={50} color={"white"} />} text="top up" onPress={topUp}/>
            <ActionButton icon={<AntDesign name="minuscircleo" size={50} color={"white"} />} text="withdraw" onPress={withdraw}/>
            {hidden? <ActionButton icon={<Feather name="eye-off" size={50} color={"white"}/>} text="Hide" onPress={Hide}/> : <ActionButton icon={<Feather name="eye" size={50} color={"white"}/>} text="Hide" onPress={Hide}/> }
        </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"space-evenly",
        alignItems:"center",
        flexDirection:"row",
        position: 'absolute',
        zIndex:100,
        borderRadius:20,
        top:-50,
        elevation:1,
        backgroundColor:BLACK_COLOR.secondary,
        width:"80%",
        height:110,
    }
})

export default BlockOfActions;