import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { BLACK_COLOR, ERROR_COLOR, PRIMARY_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { Entypo, Fontisto } from '@expo/vector-icons';
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { LineChart, PieChart } from 'react-native-chart-kit';
import Carousel from 'react-native-reanimated-carousel';
import CampaignCard from "../components/CampaignCard";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoggedInUserQuery } from "src/shared/state/api/apiSlice";
import { setUserData } from "src/shared/state/userSlice";
import { CURRENCY } from "src/shared/constants/dataConstants";
import InvestmentSummary from "../components/InvestmentSummary";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
    const userData = useSelector((state) => state.user.userData);
    const accessToken = useSelector((state) => state.user.accessToken);
    const campaignParticipations = useSelector((state) => state.user.userData.campaign_participations);
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
    ];

    const user = {
        name: "Ali Husni",
        balance: 12253.70,
        spending: 6234.00,
        currency: "$",
        notifications: 10
    };

    const formattedBalance = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(userData.wallet_amount);
    const formattedSpending = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(user.spending);


    return (
        <CustomSafeArea backgroundColor={PRIMARY_COLOR.main}>
            <View style={styles.topContainer}>
                <View style={styles.headerBar}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Hello</Text>
                        <Text style={styles.userName}>, {userData.first_name} {userData.last_name}</Text>
                    </View>
                    <View style={styles.notifications}>
                        <Fontisto name="bell" size={24} color="white" />
                    </View>
                </View>
                <Text style={styles.balanceHeading}>Your Available Balance</Text>
                <Text style={styles.balance}>{CURRENCY} {formattedBalance}</Text>
            </View>
            <InvestmentSummary
                formattedSpending={formattedSpending}
                CURRENCY={CURRENCY}
            />
            <View style={styles.carouselView}>
                <View style={styles.titleView}>
                    <Text style={styles.recentTxtStyle}>Your Investments: </Text>
                </View>
                <Carousel
                    loop
                    width={Dimensions.get("screen").width}
                    height={300}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.8,
                        parallaxScrollingOffset: 150,
                    }}
                    data={campaignParticipations}
                    scrollAnimationDuration={100}
                    renderItem={({ item }) => (
                        <CampaignCard participation={item} imgUri={item.campaign.image_url} title={item.startup.name} sharesBought={item.number_of_shares} />
                    )}
                />
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        paddingHorizontal: '5%',
        paddingTop: 20,
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
        marginBottom: 5,
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
        marginRight: "3%",
    },
    notifCount: {
        color: "white",
        textAlign: "center",
    },
    notifCountContainer: {
        backgroundColor: ERROR_COLOR.main,
        width: 27,
        paddingVertical: 2,
        borderRadius: 5,
        position: "absolute",
        top: -7,
        left: 9,
    },
    balanceHeading: {
        color: PRIMARY_COLOR.light,
        fontSize: FONT_SIZE.small,
        lineHeight: 21,
        marginBottom: 12,
        fontWeight: "500",
    },
    balance: {
        fontSize: FONT_SIZE.large * 1.4,
        fontWeight: "600",
        lineHeight: 48,
        color: "white",
        marginBottom: 131,
    },
    carouselView: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: GREY_COLOR.lightest,
        flex: 1,
    },
    recentTxtStyle: {
        color: PRIMARY_COLOR.dark,
        fontWeight: "bold",
        fontSize: FONT_SIZE.medium,
    },
    titleView: {
        width: "100%",
        paddingHorizontal: "5%",
    },
});
