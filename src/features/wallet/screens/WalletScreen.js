import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import BlockOfActions from "../components/BlockOfActions";
import TeenyButton from "../components/TeenyButton";
import { BLACK_COLOR } from "src/shared/constants/colorConstants";
import Chip from "../components/Chip";

function WalletScreen(props) {
    const DATA =[
        
    ]

    function handleViewRequests(){
        console.log("View Request Pressed");
    }
    return (  //the EGP14.17 is static
     <CustomSafeArea>
        <View style={styles.container}>
            <View style={styles.topPart}>
                <Text style={{fontSize:FONT_SIZE.medium, color:"white"}}>EGP<Text style={{fontWeight:"bold", fontSize:FONT_SIZE.large, color:"white"}}>14</Text>.17</Text>   
            </View>
            <View style={styles.block}>
                <BlockOfActions />
            </View>
            <View style={styles.bottomPart}>
                <View style={styles.middleStrip}>
                    <Text style={{fontSize:FONT_SIZE.medium}}>Recent Activities</Text>
                    <TeenyButton title="View Requests" onPress={handleViewRequests}/> 
                </View >
                <View style={styles.chipView}>
                    <Chip title="All"/> 
                    <Chip title="Funding"/>
                    <Chip title="Investing"/>
                    <Chip title="Other"/>
                </View>
                <FlatList 

                />
            </View>
        </View>
     </CustomSafeArea>
    );
    
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:BLACK_COLOR.primary
    },
    topPart: {
        padding: "5%",
        height:"15%"
    },
    bottomPart: {
        paddingHorizontal:"5%",
        paddingTop:90,                     //not very dynamic i think
        backgroundColor:"white",
        height:"90%",
        borderTopLeftRadius:50,             //what does borderTopEndRadius do?
        borderTopRightRadius:50,
        
    },
     block: {
        alignItems: "center"
     },
     middleStrip:{
        flexDirection: "row",
        justifyContent:"space-between"
     },
     chipView:{
        flexDirection:"row"
     }
});


export default WalletScreen;