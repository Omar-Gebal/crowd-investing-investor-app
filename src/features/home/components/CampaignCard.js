import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK_COLOR, GREY_COLOR, PRIMARY_COLOR, RED_COLOR } from "src/shared/constants/colorConstants";
import { CURRENCY } from 'src/shared/constants/dataConstants';
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

function CampaignCard({ participation }) {
    const { number_of_shares } = participation;
    const { name, share_price: currentSharePrice } = participation.startup;
    const { image_url, share_price: initialSharePrice } = participation.campaign;

    const initialValue = number_of_shares * initialSharePrice;
    const currentValue = number_of_shares * currentSharePrice;
    const profitLoss = currentValue - initialValue;
    const profitLossPercentage = (profitLoss / initialValue) * 100;
    const isProfit = profitLoss >= 0;

    return (
        <View style={styles.cardContainer}>
            <Pressable style={styles.imageContainer}>
                <Image source={{ uri: image_url }} style={styles.image} />
            </Pressable>
            <View style={styles.informationSection}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.sharesBought}>You Own: {number_of_shares} {number_of_shares > 1 ? 'shares' : 'share'} ({CURRENCY}{initialSharePrice} each)</Text>
                <View style={styles.valuesContainer}>
                    <Text style={styles.shareValue}>Initial: {CURRENCY}{initialValue.toFixed(2)}</Text>
                    <Text style={styles.shareValue}>Current: {CURRENCY}{currentValue.toFixed(2)}</Text>
                </View>
                <Text style={[styles.profitLoss, { color: isProfit ? PRIMARY_COLOR.dark : RED_COLOR.main }]}>
                    {isProfit ? 'Profit' : 'Loss'}: {CURRENCY}{profitLoss.toFixed(2)} ({profitLossPercentage.toFixed(2)}%)
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: BLACK_COLOR.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
    },
    imageContainer: {
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: FONT_SIZE.large,
        fontWeight: '600',
        color: BLACK_COLOR.primary,
        marginTop: 10,
        marginHorizontal: 10,
    },
    sharesBought: {
        fontSize: FONT_SIZE.medium,
        color: GREY_COLOR.medium,
        marginHorizontal: 10,
    },
    valuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    shareValue: {
        fontSize: FONT_SIZE.medium,
        color: GREY_COLOR.dark,
    },
    profitLoss: {
        fontSize: FONT_SIZE.medium,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    informationSection: {
        padding: 10,
    }
});

export default CampaignCard;
