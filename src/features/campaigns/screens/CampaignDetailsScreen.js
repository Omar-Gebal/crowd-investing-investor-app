import { View, StyleSheet, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import DefaultVerticalSpacing from 'src/features/auth/components/DefaultVerticalSpacing';
import CustomButton from 'src/shared/components/CustomButton';
import { SECONDARY_COLOR } from 'src/shared/constants/colorConstants';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import ProgressBar from '../components/ProgressBar';
import { useGetStartupDetailsQuery } from 'src/shared/state/api/apiSlice';
import StartupSection from '../components/StartupSection';
import { useNavigation } from '@react-navigation/native';

function CampaignDetailsScreen({ navigation }) {
    const selectedCampaign = useSelector((state) => state.campaign.selectedCampaign)
    const startDate = new Date(selectedCampaign.start_time).toLocaleString().split(',')[0]
    const { data: startupData, isLoading, isError } = useGetStartupDetailsQuery(selectedCampaign.startup_id);
    const HighlightedText = ({ text }) => <Text style={styles.highlightedText}>{text}</Text>

    return (
        <ScrollView style={styles.screenWrapper}>
            <Image
                source={{ uri: selectedCampaign.image_url }}
                style={styles.imageContainer}
            />
            <View style={styles.detailsWrapper}>
                <Text style={styles.title}>{selectedCampaign.name}</Text>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text>{selectedCampaign.description}</Text>
                <DefaultVerticalSpacing />
                <CustomButton title={"Buy shares"} onPress={() => navigation.navigate("BuyShares")} />
                <DefaultVerticalSpacing />
                <Text style={styles.sectionTitle}>Campaign Progress</Text>
                <ProgressBar percentComplete={selectedCampaign.percent_complete} />
                <View style={styles.detailsContainer}>
                    <View style={styles.column}>
                        <Text>
                            Amount Invested: <HighlightedText text={`$${selectedCampaign.amount_invested.toLocaleString()}`} />
                        </Text>
                        <Text>
                            Percentage complete: <HighlightedText text={`${selectedCampaign.percent_complete}%`} />
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text>
                            Target: <HighlightedText text={`$${selectedCampaign.target.toLocaleString()}`} />
                        </Text>
                        <Text>Remaining Time: <HighlightedText text={selectedCampaign.remaining_time} /></Text>
                    </View>
                </View>
                <DefaultVerticalSpacing />
                {<StartupSection isLoading={isLoading} isError={isError} startup={startupData} styles={styles} HighlightedText={HighlightedText} />}
                <DefaultVerticalSpacing />
                <Text style={styles.sectionTitle}>Extra Details</Text>
                <Text style={styles.sectionItem}>📅 Campaign start date : <HighlightedText text={startDate} /></Text>
                <Text style={styles.sectionItem}>📃 Campaign status : <HighlightedText text={selectedCampaign.status} /></Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailsWrapper: {
        paddingHorizontal: '5%',
    },
    imageContainer: {
        aspectRatio: 16 / 9,
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: FONT_SIZE.medium,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.small,
        fontWeight: 'bold',
        color: SECONDARY_COLOR.dark,
        marginBottom: 5,
    },
    sectionItem: {
        marginBottom: 5,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    highlightedText: {
        color: SECONDARY_COLOR.main,
    },
});

export default CampaignDetailsScreen;
