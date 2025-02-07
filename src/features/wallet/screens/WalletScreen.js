import { FlatList, StyleSheet, Text, View } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { FONT_SIZE, MARGINS } from "src/shared/constants/dimension_constants";
import BlockOfActions from "../components/BlockOfActions";
import TeenyButton from "../components/TeenyButton";
import { BLACK_COLOR, PRIMARY_COLOR } from "src/shared/constants/colorConstants";
import Chip from "../components/Chip";
import TransactionCard from "../components/TransactionCard";
import { useState, useEffect } from "react";
import { useGetLoggedInUserQuery } from "src/shared/state/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "src/shared/state/userSlice";
import { CURRENCY } from "src/shared/constants/dataConstants";
import { separateDateTime } from "src/shared/utils/converters";
import DefaultActivityIndicator from "src/shared/components/DefaultActivityIndicator";

function WalletScreen({ navigation }) {
    const [currentList, setCurrentList] = useState("all");
    const accessToken = useSelector((state) => state.user.accessToken);
    const hidden = useSelector((state) => state.user.amountsHidden);
    const userData = useSelector((state) => state.user.userData)
    const dispatch = useDispatch();

    const { data, isLoading } = useGetLoggedInUserQuery(accessToken);
    useEffect(() => {
        if (data) {
            dispatch(setUserData(data));
        }
    }, [data]);


    const renderItem = ({ item }) => {
        if (currentList === "funding")
            return (item.activity_type === "top_up" || item.activity_type === "withdraw" ? <TransactionCard name={item.name} type={item.activity_type} amount={item.amount} date={item.date} /> : null)
        else if (currentList === "investing")
            return (item.activity_type === "buy" || item.activity_type === "sell" ? <TransactionCard name={item.name} type={item.activity_type} amount={item.amount} date={item.date} /> : null)
        else
            return (<TransactionCard name={item.name} type={item.activity_type} amount={item.amount} date={item.date} />)
    };


    function handleViewRequests() {
        console.log("View Request Pressed");
    }
    return (
        <CustomSafeArea backgroundColor={PRIMARY_COLOR.main}>
            <View style={styles.container}>
                <View style={styles.topPart}>
                    <Text style={{ fontSize: FONT_SIZE.small, color: "white" }}>Available balance</Text>
                    <Text style={{ fontWeight: "bold", fontSize: FONT_SIZE.large, color: "white" }}>{CURRENCY}{hidden ? 'XXXX' : userData.wallet_amount}</Text>
                </View>
                <View style={styles.block}>
                    <BlockOfActions navigation={navigation} />
                </View>
                <View style={styles.bottomPart}>
                    <View style={styles.middleStrip}>
                        <Text style={{ fontSize: FONT_SIZE.medium }}>Recent Activities</Text>
                        <TeenyButton title="View Requests" onPress={handleViewRequests} />
                    </View >
                    <View style={styles.chipView}>
                        <Chip title="All" onPress={() => setCurrentList("all")} locked={currentList === "all" ? true : false} />
                        <Chip title="Funding" onPress={() => setCurrentList("funding")} locked={currentList === "funding" ? true : false} />
                        <Chip title="Investing" onPress={() => setCurrentList("investing")} locked={currentList === "investing" ? true : false} />

                    </View>
                    <View style={styles.listView}>
                        {data &&
                            <FlatList
                                data={userData.wallet_activities}
                                renderItem={renderItem}
                                style={styles.flatListStyle}
                                ListFooterComponent={<View style={{ height: 550, backgroundColor: "white" }} />}
                            />
                        }
                        {isLoading && <DefaultActivityIndicator color={PRIMARY_COLOR.main} />}

                    </View>
                </View>
            </View>
        </CustomSafeArea>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRIMARY_COLOR.main,
    },
    topPart: {
        paddingHorizontal: "5%",
        paddingTop: 20,
        paddingBottom: 60,
        backgroundColor: PRIMARY_COLOR.main
    },
    bottomPart: {
        paddingHorizontal: "5%",
        paddingTop: 90,
        backgroundColor: "white",
        position: "relative",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        gap: 10

    },
    block: {
        alignItems: "center"
    },
    middleStrip: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    chipView: {
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    listView: {

    },

    flatListStyle: {
    }
});


export default WalletScreen;