import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { GREY_COLOR, BLACK_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, ERROR_COLOR } from "src/shared/constants/colorConstants";
import { AntDesign } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { CURRENCY } from 'src/shared/constants/dataConstants';
import { useGetInvestmentsPerIndustryQuery } from 'src/shared/state/api/apiSlice';
import { useSelector } from 'react-redux';
import DefaultActivityIndicator from 'src/shared/components/DefaultActivityIndicator';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';

const InvestmentSummary = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const { data, isLoading, isError, refetch } = useGetInvestmentsPerIndustryQuery(accessToken, { refetchOnMountOrArgChange: true });

    // Placeholder data if loading or error occurs
    let investmentsPerIndustry = [];
    if (!isLoading && !isError && data && data.success) {
        investmentsPerIndustry = data.investments_per_industry;
    }

    const totalInvestment = useMemo(() => {
        if (!isLoading && !isError && data && data.success) {
            return data.investments_per_industry.reduce((total, investment) => total + investment.amount, 0);
        }
        return 0;
    }, [data, isLoading, isError]);

    // Transform the data for the pie chart
    const pieData = investmentsPerIndustry.map((investment, index) => ({
        name: investment.industry,
        amount: investment.amount,
        color: [
            "#FF6B6B", // Red
            "#FFD166", // Orange
            "#06D6A0", // Turquoise
            "#118AB2", // Blue
            "#8338EC", // Purple
            "#FFC300", // Yellow
        ][index % 6],
        legendFontColor: GREY_COLOR.medium,
        legendFontSize: 14,
    }));

    // Function to handle refreshing data
    const handleRefresh = () => {
        refetch();
    };

    // Render the chart with data
    return (
        <View style={styles.lowerContainer}>
            <View style={styles.floatingCard}>
                {investmentsPerIndustry.length === 0 ? (
                    isLoading ? (
                        <DefaultActivityIndicator color={SECONDARY_COLOR.dark} />
                    ) : (
                        <View style={styles.noInvestmentsContainer}>
                            <Text style={styles.noInvestmentsText}>No Investments Made Yet</Text>
                        </View>
                    )
                ) : (
                    <View>
                        <Text style={styles.spendingHeading}>Total Investment Value:</Text>
                        <View style={styles.spendingCont}>
                            <View>
                                <Text style={styles.spending}>{CURRENCY}{totalInvestment}</Text>
                            </View>
                            <TouchableOpacity onPress={handleRefresh}>
                                <AntDesign name="reload1" size={24} color={PRIMARY_COLOR} />
                            </TouchableOpacity>
                        </View>
                        <PieChart
                            data={pieData}
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
                            accessor={"amount"}
                            backgroundColor={"transparent"}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    lowerContainer: {
        backgroundColor: GREY_COLOR.lightest,
        paddingHorizontal: '5%',
        height: 170,
    },
    floatingCard: {
        backgroundColor: "white",
        position: "relative",
        top: -95,
        borderRadius: 15,
        paddingHorizontal: 20,
        shadowOffset: { width: 0, height: 34 },
        shadowColor: "#08090B12",
        shadowOpacity: 0.7,
        shadowRadius: 200,
        display: "flex",
        minHeight: 250,
        justifyContent: "center",
    },
    noInvestmentsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    noInvestmentsText: {
        color: GREY_COLOR.dark,
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    spendingCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
        width: "100%"
    },
    spendingHeading: {
        color: GREY_COLOR.dark,
        fontSize: FONT_SIZE.medium,
        marginBottom: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    spending: {
        color: BLACK_COLOR.secondary,
        fontSize: FONT_SIZE.medium,
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
        backgroundColor: ERROR_COLOR.main,
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
        left: -40,
    },
});

export default InvestmentSummary;
