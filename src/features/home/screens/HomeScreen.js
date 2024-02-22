import { View, StyleSheet, Text, Dimensions } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import { BLACK_COLOR, ERROR_COLOR, GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { Entypo, Fontisto, AntDesign } from '@expo/vector-icons';
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { LineChart } from 'react-native-chart-kit'

export default function HomeScreen() {

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
    return (
        <CustomSafeArea style={{ backgroundColor: GREEN_COLOR.main }}>
            <View style={styles.topContainer}>
                <View style={styles.headerBar}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Hello</Text>
                        <Text style={styles.userName}>, {user.name}</Text>
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
                <Text style={styles.balance}>{user.currency + formattedBalance}</Text>

            </View>
            <View style={styles.lowerContainer}>
                <View style={styles.floatingCard} >
                    <View style={styles.spendingCont}>
                        <View>
                            <Text style={styles.spendingHeading}>Total Spending</Text>
                            <Text style={styles.spending}>{user.currency + formattedSpending}</Text>
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
        flex: 1

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
        color: GREEN_COLOR.light,
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
        color: GREEN_COLOR.light,
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
    }

});


