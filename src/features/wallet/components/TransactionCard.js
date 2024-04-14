import { Pressable, StyleSheet, Text, View } from "react-native";
import { GREY_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { AntDesign } from '@expo/vector-icons';
function TransactionCard({title, type, time, date, amount}) {
    return (
        <Pressable style={styles.container}>
            <View style={styles.leftSide}>
                {type === "addToWallet"? <AntDesign name="plus" size={24} color={GREY_COLOR.medium} /> :  <AntDesign name="arrowleft" size={24} color={GREY_COLOR.medium} />}
                <View style={styles.dateTimeView}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <Text style={styles.dateTimeStyle}>{date}  {time}</Text>
                </View>
            </View>
            <Text style={styles.amountStyle}>{amount}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        padding:"5%",
        borderRadius: 20,
        width:"100%",
        shadowColor: "#000",
        borderWidth:1,
        borderColor:GREY_COLOR.lightest,
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:10                             //i know the margin between the cards should be applied in the parent screen, but i cant figure it out
        
    },
    leftSide:{
        flexDirection:"row",
        gap:10,
        alignItems:"center",
        
    },
    titleStyle:{
        fontSize:FONT_SIZE.medium
    },
    dateTimeStyle:{
        color:GREY_COLOR.light
    },
    amountStyle:{
        fontSize:FONT_SIZE.medium
    }
})

export default TransactionCard;