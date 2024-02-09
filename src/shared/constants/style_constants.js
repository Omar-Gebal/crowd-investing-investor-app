import { StyleSheet } from "react-native"
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#34B67F",
        textAlign:"center",
        padding:16,
        borderRadius:50
    },
    buttontxt:{
        color:"white",
        textAlign:"center",
        fontSize:FONT_SIZE.medium
    },
    inputField:{
        borderWidth:1,
        borderColor:"#ACB5BB",
        borderRadius: 60,
        padding:16,
        paddingLeft:20,
    }
})



export default styles;