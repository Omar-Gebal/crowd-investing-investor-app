import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { GREY_COLOR, BLACK_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

function CampaignCard({ participation, imgUri, title, sharesBought }) {
    const { number_of_shares } = participation;
    const { name } = participation.startup;
    const { image_url } = participation.campaign;
    return (
        <View style={styles.cardContainer}>
            <Pressable style={styles.imageContainer}>
                <Image source={{ uri: image_url }} style={styles.image} />
            </Pressable>
            <View style={styles.informationSection}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.sharesBought}>You Own: {number_of_shares} {number_of_shares > 1 ? 'shares' : 'share'}</Text>
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
        marginBottom: 10,
        marginHorizontal: 10,
    },
    informationSection: {
        padding: 10
    }
});

export default CampaignCard;
