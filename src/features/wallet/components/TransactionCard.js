import { Pressable, StyleSheet, Text, View } from "react-native";
import { GREY_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { AntDesign } from '@expo/vector-icons';
import { separateDateTime } from "src/shared/utils/converters";
import { useSelector } from "react-redux";
function TransactionCard({ name, type, date, amount }) {

    const dateTime = separateDateTime("2024-04-15T12:00:00");
    const hidden = useSelector((state) => state.user.amountsHidden);
    return (
        <Pressable style={styles.container}>
            <View style={styles.leftSide}>
                {type === "top_up" && <AntDesign name="plus" size={24} color={GREY_COLOR.medium} />}
                {type === "withdraw" && <AntDesign name="minus" size={24} color={GREY_COLOR.medium} />}
                {type === "buy" && <AntDesign name="arrowleft" size={24} color={GREY_COLOR.medium} />}
                {type === "sell" && <AntDesign name="arrowright" size={24} color={GREY_COLOR.medium} />}
                <View style={styles.dateTimeView}>
                    <Text style={styles.titleStyle}>{name}</Text>
                    <Text style={styles.dateTimeStyle}>{dateTime.date} {dateTime.time}</Text>
                </View>
            </View>
            <Text style={styles.amountStyle}>{hidden ? 'XX' : amount}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: "5%",
        borderRadius: 20,
        width: "100%",
        shadowColor: "#000",
        borderWidth: 1,
        borderColor: GREY_COLOR.lightest,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10

    },
    leftSide: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",

    },
    titleStyle: {
        fontSize: FONT_SIZE.medium
    },
    dateTimeStyle: {
        color: GREY_COLOR.light
    },
    amountStyle: {
        fontSize: FONT_SIZE.medium
    }
})

export default TransactionCard;