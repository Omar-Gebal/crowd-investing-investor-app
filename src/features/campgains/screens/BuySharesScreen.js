import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR } from 'src/shared/constants/colorConstants';
import NumberPad from '../components/NumberPad';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import { useSelector } from 'react-redux';
import CustomButton from 'src/shared/components/CustomButton';


function BuySharesScreen(props) {
    const numOfShares = useSelector((state) => state.numpad.number);
    const [sharesAmt, setSharesAmt]= useState();
    

    function confirmShare(){
        console.log("bought share");
    }
    
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.titleStyle}>BUY sharNameHere </Text>
                <Text style={styles.balanceTxtStyle}>@EGP WalletBalanceHere</Text>
                <Text style={styles.amtOfSharesStyle}>amtOfSharesHere Available</Text>
                <View style={styles.sharesView}>
                    <Text></Text>
                    <Text style={styles.sharesTxtStyle}>{numOfShares} Shares</Text> 
                    <Text style={styles.EgpTxtStyle}>= EGP 0.00</Text> 
                </View>
                <CustomButton title="Buy" onPress={confirmShare}/>
            </View>
            <View style={styles.bottom}>
            <NumberPad />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
    },
    titleStyle:{
        fontWeight:"bold",
        fontSize:FONT_SIZE.large
    },
    balanceTxtStyle:{
        fontWeight:"bold",
        fontSize:FONT_SIZE.medium
    },
    amtOfSharesStyle:{
        fontSize:FONT_SIZE.medium,
        textAlign:"center",
        color:GREY_COLOR.medium
    },
    sharesView:
    {
        marginVertical:50,
        alignItems:"center"
    },
    sharesTxtStyle:{
        fontWeight:"bold",
        color:PRIMARY_COLOR.dark,
        fontSize:FONT_SIZE.large
    },
    EgpTxtStyle:{
        fontSize:FONT_SIZE.medium
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    top:{
        paddingTop:50,
        paddingHorizontal:"15%",
       
        height:450
    },
    bottom:{
        flex:1,
       
    }
})
export default BuySharesScreen;