
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { BLACK_COLOR } from 'src/shared/constants/colorConstants';
function BlockOfActions(props) {
    function withdraw(){
        console.log("withdraw pressed");
    }
    function topUp(){
        console.log("TopUp pressed");
    }
    function Hide(){
        console.log("Hide pressed");
    }
    return (
        <View style={styles.container}>
            <ActionButton icon={<AntDesign name="pluscircle" size={50} color={"white"} />} text="top up" onPress={topUp}/>
            <ActionButton icon={<AntDesign name="minuscircleo" size={50} color={"white"} />} text="withdraw" onPress={withdraw}/>
            <ActionButton icon={<MaterialIcons name="hide-source" size={50} color={"white"}/>} text="Hide" onPress={Hide}/>
        </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
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