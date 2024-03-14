import { View, StyleSheet, Text, Image } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'src/shared/constants/colorConstants';

function CampaignCard({ campaign }) {
    return (
        <View style={styles.campaignCard}>
            <Image
                source={{ uri: campaign.image_url }}
                style={styles.campaignImage}
                resizeMode="cover"
            />
            <View style={styles.campaignDetails}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <View style={styles.progressContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${campaign.percent_complete}%` },
                        ]}
                    />
                </View>

                <Text style={styles.infoText}>
                    Target: <Text style={styles.highlightedText}>${campaign.target.toLocaleString()}</Text>
                </Text>
                <Text style={styles.infoText}>
                    Remaining Time: <Text style={styles.highlightedText}>{campaign.remaining_time}</Text>
                </Text>
            </View>
        </View>
    );
}



export default CampaignCard;

const styles = StyleSheet.create({
    campaignCard: {
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 5,
        marginVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    campaignImage: {
        width: 100,
        height: 'auto',
        marginRight: 10,
    },
    campaignDetails: {
        flex: 1,
        padding: 10,
    },
    campaignName: {
        fontSize: FONT_SIZE.medium,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    progressContainer: {
        height: 10,
        backgroundColor: GREY_COLOR.lightest,
        borderRadius: 5,
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: PRIMARY_COLOR.main,
        borderRadius: 5,
    },
    infoText: {
        fontSize: FONT_SIZE.small,
        color: GREY_COLOR.medium,
    },
    highlightedText: {
        color: SECONDARY_COLOR.main,
    },
});