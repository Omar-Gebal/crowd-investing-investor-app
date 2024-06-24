import { View, StyleSheet, Text, Dimensions } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { BLACK_COLOR, ERROR_COLOR, PRIMARY_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { Entypo, Fontisto, AntDesign } from '@expo/vector-icons';
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { LineChart } from 'react-native-chart-kit';
import Carousel from 'react-native-reanimated-carousel';
import CampaignCard from "../components/CampaignCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoggedInUserQuery } from "src/shared/state/api/apiSlice";
import { setUserData } from "src/shared/state/userSlice";
import { CURRENCY } from "src/shared/constants/dataConstants";


export default function HomeScreen() {
    const userData = useSelector((state) => state.user.userData)
    const accessToken = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();

    const { data, isLoading } = useGetLoggedInUserQuery(accessToken);
    useEffect(() => {
        if (data) {
            dispatch(setUserData(data));
        }
    }, [data]);


    const fakeData = [
        {
            img: "https://pathmonk.com/wp-content/uploads/2024/01/best-startup-marketing-campaigns-1024x585.png",
            campaignTitle: "Free Business Education",
            sharesBought: 10
        },
        {
            img: "https://cdn.britannica.com/74/190774-131-CC3FEB1F/jeans-denim-pants-clothing.jpg",
            campaignTitle: "Low-Waisted Pants Shop",
            sharesBought: 50000
        },
        {
            img: "https://i.etsystatic.com/11931609/r/il/7c1191/1091679622/il_570xN.1091679622_ggrp.jpg",
            campaignTitle: "Crystal Jewelry Shop",
            sharesBought: 30
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcj3h0gMQw65xbDcE-RibsElSyU6Zz9pDRqzCiWlMqoA&s",
            campaignTitle: "Car at Your Door Co",
            sharesBought: 1
        },
        {
            img: "https://store-images.s-microsoft.com/image/apps.56161.9007199266246365.1d5a6a53-3c49-4f80-95d7-78d76b0e05d0.a3e87fea-e03e-4c0a-8f26-9ecef205fa7b",
            campaignTitle: "Watch with Ease",
            sharesBought: 1
        }

    ]
    const [currentCampaignBeingDisplayed, setCurrentCampaignBeingDisplayed] = useState(fakeData[0]);

    const user = {
        name: "Ali Husni",
        balance: 12253.70,
        spending: 6234.00,
        currency: "$",
        notifications: 10
    }
    const formattedBalance = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(user.balance)
    const formattedSpending = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(user.spending)
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [60, 50, 70, 80, 105, 80, 70, 60, 80, 90, 100, 80, 70]
            },
        ],
    };
    var graphWidth;

    function changeCampaignBeingDisplayed(index) {
        setCurrentCampaignBeingDisplayed(fakeData[index]);
        console.log(currentCampaignBeingDisplayed);
    }


    return (
        <CustomSafeArea backgroundColor={PRIMARY_COLOR.main}>
            <View style={styles.topContainer}>
                <View style={styles.headerBar}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Hello</Text>
                        <Text style={styles.userName}>, {userData.first_name} {userData.last_name}</Text>
                        <Entypo name="chevron-down" size={22} color="white" />
                    </View>
                    <View style={styles.notifications}>
                        <Fontisto name="bell" size={24} color="white" />
                        <View style={styles.notifCountContainer}>
                            <Text style={styles.notifCount}>{user.notifications > 9 ? "9+" : user.notifications}</Text>

                        </View>
                    </View>
                </View>
                <Text style={styles.balanceHeading}>My Available Balance</Text>
                <Text style={styles.balance}>{CURRENCY} {userData.wallet_amount}</Text>

            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.floatingCard} >
                    <View style={styles.spendingCont}>
                        <View>
                            <Text style={styles.spendingHeading}>Total Spending</Text>
                            <Text style={styles.spending}>{CURRENCY} {formattedSpending}</Text>
                        </View>
                        <View style={styles.percentageCont}>
                            <View style={styles.percNumberCont}>
                                <AntDesign style={{ marginHorizontal: 3 }} name="caretup" size={10} color="white" />
                                <Text style={styles.percNumber}>3.2%</Text>
                            </View>
                            <Entypo name="chevron-right" size={24} color={GREY_COLOR.light} />
                        </View>
                    </View>
                    <LineChart
                        style={styles.lineGraph}
                        data={lineChartData}
                        height={75}
                        width={Dimensions.get("screen").width}
                        chartConfig={{
                            backgroundColor: "#FFFFFF00",
                            backgroundGradientFrom: "#FFFFFF00",
                            backgroundGradientTo: "#FFFFFF00",
                            color: (opacity = 3) => `rgba(255, 92, 122, ${opacity})`,
                            fillShadowGradientFrom: ERROR_COLOR.light,
                            fillShadowGradientFromOpacity: 0.3,
                            fillShadowGradientToOpacity: 0,
                            strokeWidth: 3,
                            backgroundGradientToOpacity: 0,
                            backgroundGradientFromOpacity: 0
                        }}
                        withHorizontalLabels={false}
                        withVerticalLabels={false}
                        withHorizontalLines={false}
                        withVerticalLines={false}
                        withDots={false}
                        bezier
                    />
                </View>
            </View>
            <View style={styles.carouselView}>
                <View style={styles.titleView}>
                    <Text style={styles.recentTxtStyle}>Your Shares: </Text>
                </View>
                <Carousel
                    loop
                    width={Dimensions.get("screen").width}
                    height={200}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.8,
                        parallaxScrollingOffset: 150,
                    }}
                    data={fakeData}
                    scrollAnimationDuration={2000}
                    onSnapToItem={(index) => changeCampaignBeingDisplayed(index)}
                    renderItem={({ item, index }) => (
                        <CampaignCard imgUri={item.img} />
                    )}
                />
                <Text style={styles.titleTxtStyle}>{currentCampaignBeingDisplayed.campaignTitle}</Text>
                <Text style={styles.sharesBoughtTxtStyle}>You Bought:{currentCampaignBeingDisplayed.sharesBought} shares</Text>
            </View>
        </CustomSafeArea>
    );
}


const styles = StyleSheet.create({
    topContainer: {
        paddingHorizontal: '5%',
        paddingTop: 24.5
    },
    lowerContainer: {
        backgroundColor: GREY_COLOR.lightest,
        paddingHorizontal: '5%',
        height: 110

    },
    headerBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    greetingContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24
    },
    greeting: {
        fontSize: FONT_SIZE.medium,
        lineHeight: FONT_SIZE.medium + 5,
        fontWeight: "500",
        color: PRIMARY_COLOR.light,
    },
    userName: {
        fontSize: FONT_SIZE.medium,
        lineHeight: FONT_SIZE.medium + 5,
        fontWeight: "500",
        color: "white",
        marginRight: 10,
    },
    notifications: {
        marginRight: "3%"
    },
    notifCount: {
        color: "white",
        textAlign: "center"

    },
    notifCountContainer: {
        backgroundColor: ERROR_COLOR.main,
        width: 27,
        paddingVertical: 2,
        borderRadius: 5,
        position: "absolute",
        top: -7,
        left: 9
    },
    balanceHeading: {
        color: PRIMARY_COLOR.light,
        fontSize: FONT_SIZE.small,
        lineHeight: 21,
        marginBottom: 12,
        fontWeight: "500"

    },
    balance: {
        fontSize: 40,
        fontWeight: "600",
        lineHeight: 48,
        color: "white",
        marginBottom: 131
    },
    floatingCard: {
        backgroundColor: "red",
        position: "relative",
        top: -95,
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 24,
        shadowOffset: { width: 0, height: 34 },
        shadowColor: "#08090B12",
        shadowOpacity: 0.7,
        shadowRadius: 200,
        display: "flex",
        alignItems: "center"
    },
    spendingCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    spendingHeading: {
        color: GREY_COLOR.light,
        fontSize: FONT_SIZE.small,
        fontWeight: "500",
        lineHeight: 21,
        marginBottom: 8
    },
    spending: {
        color: BLACK_COLOR.secondary,
        fontWeight: "600",
        fontSize: 24,
        lineHeight: 36
    },
    percentageCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 4
    },
    percNumberCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: ERROR_COLOR.light,
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 12,
        marginRight: 16
    },
    percNumber: {
        color: "white",
        fontSize: FONT_SIZE.small,
        fontWeight: "600",
        lineHeight: 21,
        marginLeft: 2
    },
    lineGraph: {
        position: "relative",
        left: -20
    },
    carouselView: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: GREY_COLOR.lightest,
        flex: 1
    },
    titleTxtStyle: {
        fontSize: FONT_SIZE.medium,
        fontWeight: "bold"
    },
    sharesBoughtTxtStyle: {
        fontSize: FONT_SIZE.medium,
        color: GREY_COLOR.medium
    },
    recentTxtStyle: {
        color: PRIMARY_COLOR.dark,
        fontWeight: "bold",
        fontSize: FONT_SIZE.medium,
    },
    titleView: {
        width: "100%",
        paddingHorizontal: "5%"
    }

});


