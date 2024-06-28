import React from 'react';
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { GREY_COLOR, BLACK_COLOR, ERROR_COLOR, PRIMARY_COLOR } from "src/shared/constants/colorConstants";
import { AntDesign } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';

const InvestmentSummary = ({ formattedSpending, fakePieData, CURRENCY }) => {
    return (
        <View style={styles.lowerContainer}>
            <View style={styles.floatingCard}>
                <View style={styles.spendingCont}>
                    <View>
                        <Text style={styles.spendingHeading}>Total Investment Value</Text>
                        <Text style={styles.spending}>{CURRENCY} {formattedSpending}</Text>
                    </View>
                    <View style={styles.percentageCont}>
                        <View style={styles.percNumberCont}>
                            <AntDesign style={{ marginHorizontal: 3 }} name="caretup" size={10} color="white" />
                            <Text style={styles.percNumber}>3.2%</Text>
                        </View>
                    </View>
                </View>
                <PieChart
                    data={fakePieData}
                    style={styles.lineGraph}
                    width={Dimensions.get("window").width}
                    height={150}
                    chartConfig={{
                        backgroundColor: "#FFFFFF00",
                        backgroundGradientFrom: "#FFFFFF00",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientTo: "#FFFFFF00",
                        backgroundGradientToOpacity: 0.5,
                        color: (opacity = 3) => `rgba(255, 92, 122, ${opacity})`,
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    lowerContainer: {
        backgroundColor: GREY_COLOR.lightest,
        paddingHorizontal: '5%',
        height: 190,
    },
    floatingCard: {
        backgroundColor: "white",
        position: "relative",
        top: -95,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 24,
        shadowOffset: { width: 0, height: 34 },
        shadowColor: "#08090B12",
        shadowOpacity: 0.7,
        shadowRadius: 200,
        display: "flex",
    },
    spendingCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    spendingHeading: {
        color: GREY_COLOR.medium,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        marginBottom: 8,
    },
    spending: {
        color: BLACK_COLOR.secondary,
        fontWeight: "600",
        fontSize: 24,
        lineHeight: 36,
    },
    percentageCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 4,
    },
    percNumberCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: ERROR_COLOR.light,
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 12,
        marginRight: 16,
    },
    percNumber: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 21,
        marginLeft: 2,
    },
    lineGraph: {
        position: "relative",
        left: -30,
    },
});

export default InvestmentSummary;
