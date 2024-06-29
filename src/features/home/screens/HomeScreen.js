import React, { useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { ERROR_COLOR, PRIMARY_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { Fontisto, Entypo } from '@expo/vector-icons';
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import Carousel from 'react-native-reanimated-carousel';
import CampaignCard from "../components/CampaignCard";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoggedInUserQuery } from "src/shared/state/api/apiSlice";
import { setUserData } from "src/shared/state/userSlice";
import { CURRENCY } from "src/shared/constants/dataConstants";
import InvestmentSummary from "../components/InvestmentSummary";

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

    const formattedBalance = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(userData.wallet_amount);
    const formattedSpending = new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(userData.spending);

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
                <Text style={styles.balance}>{CURRENCY}{formattedBalance}</Text>
            </View>
            <InvestmentSummary
                formattedSpending={formattedSpending}
                CURRENCY={CURRENCY}
            />
            <View style={styles.carouselView}>
                <View style={styles.titleView}>
                    <Text style={styles.recentTxtStyle}>Your Investments: </Text>
                </View>
                {campaignParticipations && campaignParticipations.length > 0 ? (
                    <Carousel
                        width={Dimensions.get("screen").width}
                        height={290}
                        mode="parallax"
                        modeConfig={{
                            parallaxScrollingScale: 0.7,
                            parallaxScrollingOffset: 170,
                        }}
                        data={campaignParticipations}
                        scrollAnimationDuration={100}
                        renderItem={({ item }) => (
                            <CampaignCard participation={item} />
                        )}
                    />
                ) : (
                    <View style={styles.noParticipationsContainer}>
                        <Entypo name="emoji-happy" size={48} color={PRIMARY_COLOR.main} style={styles.noParticipationsIcon} />
                        <Text style={styles.noParticipationsText}>
                            You have no campaign participations.
                        </Text>
                        <Text style={styles.noParticipationsSubText}>
                            Check out campaigns in the <Text style={styles.campaignsTabText}>Campaigns tab</Text>!
                        </Text>
                    </View>
                )}
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
    noParticipationsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: '5%',
        paddingVertical: 20,
        backgroundColor: GREY_COLOR.lightest,
        borderRadius: 10,
        margin: 10,
    },
    noParticipationsIcon: {
        marginBottom: 10,
    },
    noParticipationsText: {
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
        color: GREY_COLOR.dark,
        textAlign: 'center',
    },
    noParticipationsSubText: {
        fontSize: FONT_SIZE.medium,
        color: GREY_COLOR.medium,
        textAlign: 'center',
        marginTop: 5,
    },
    campaignsTabText: {
        color: PRIMARY_COLOR.main,
        fontWeight: 'bold',
    },
});
