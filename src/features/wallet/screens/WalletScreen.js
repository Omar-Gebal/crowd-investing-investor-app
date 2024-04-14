import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import BlockOfActions from "../components/BlockOfActions";
import TeenyButton from "../components/TeenyButton";
import { BLACK_COLOR } from "src/shared/constants/colorConstants";
import Chip from "../components/Chip";
import TransactionCard from "../components/TransactionCard";
import { useState } from "react";

function WalletScreen(props) {
    const [currentList, setCurrentList]= useState("all");
    
    const allData =[
        {
            transactionType:"addToWallet",
            title:"Top up",
            amount:"500",
            date:"19/03/2024",
            time:"12:31 am"
        }, 
        {
            transactionType:"addToWallet",
            title:"Top up",
            amount:"1000",
            date:"19/03/2024",
            time:"12:33 am"
        },
        {
            transactionType:"investment",
            title:"Buy EFID",
            amount:"-288.11",
            date:"20/03/2024",
            time:"03:03 pm"
        },
        {
            transactionType:"funding",
            title:"Buy CI30",
            amount:"-3000.11",
            date:"30/03/2024",
            time:"10:44 pm"
        },
        {
            transactionType:"funding",
            title:"Buy CI40",
            amount:"-3100.11",
            date:"30/03/2024",
            time:"10:50 pm"
        },
        {
            transactionType:"other",
            title:"Buy V20",
            amount:"-478.11",
            date:"21/04/2024",
            time:"10:50 pm"
        },
        {
            transactionType:"investment",
            title:"Buy V19",
            amount:"-700.11",
            date:"20/03/2024",
            time:"04:03 pm"
        },
    ]

    function getAllTransactions(){
        setCurrentList("all");
        console.log("alltrans");
    }
    function getFundingTransactions(){
        setCurrentList("funding");
        console.log("fundingtrans");
    }
    function getInvestingTransactions(){
        setCurrentList("investing");
        console.log("investingtrans");
    }
    function getOtherTransactions(){
        setCurrentList("other");
        console.log("othertrans");
    }

    const renderItem = ({ item }) => {
        if (currentList === "funding") 
            return( item.transactionType === "funding" ? <TransactionCard title={item.title} type={item.transactionType} amount={item.amount} time={item.time} date={item.date} /> : null)
        else if (currentList === "investing")
            return(item.transactionType ==="investment" ? <TransactionCard title={item.title} type={item.transactionType} amount={item.amount} time={item.time} date={item.date} /> : null)
        else if(currentList === "other")
            return(item.transactionType ==="other" ? <TransactionCard title={item.title} type={item.transactionType} amount={item.amount} time={item.time} date={item.date} /> : null)
        else
            return(<TransactionCard title={item.title} type={item.transactionType} amount={item.amount} time={item.time} date={item.date} />)
    };


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
                    <Chip title="All"  onPress={getAllTransactions} locked={ currentList === "all" ? true : false}/> 
                    <Chip title="Funding" onPress={getFundingTransactions}  locked={ currentList === "funding" ? true : false}/>
                    <Chip title="Investing" onPress={getInvestingTransactions}  locked={ currentList === "investing" ? true : false}/>
                    <Chip title="Other" onPress={getOtherTransactions}  locked={ currentList === "other" ? true : false}/>
                </View>
                <View style={styles.listView}>
                    <FlatList 
                        data={allData}
                        renderItem={renderItem}
                        style={styles.flatListStyle}
                        ListFooterComponent={<View style={{height: 300}}/>}
                    />
                </View>
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
        paddingTop:90,                     //not dynamic based on the height size of the ActionBox
        backgroundColor:"white",
        height:"90%",
        borderTopLeftRadius:50,             //what does borderTopEndRadius do?
        borderTopRightRadius:50,
        gap:10
        
    },
     block: {
        alignItems: "center"
     },
     middleStrip:{
        flexDirection: "row",
        justifyContent:"space-between"
     },
     chipView:{
        justifyContent:"space-evenly",
        flexDirection:"row"
     },
     listView:{
      
     },
     flatListStyle:{
        height:"100%",
        
     }
});


export default WalletScreen;