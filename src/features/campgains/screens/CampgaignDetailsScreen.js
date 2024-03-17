import { View, StyleSheet, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';

function CampaignDetailsScreen({ navigation }) {
    const counter = useSelector((state) => state.campaign.selectedCampaign)

    return (
        <CustomSafeArea>
            <View style={styles.screenWrapper}>
                <Text>{'haha'}</Text>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    },

});


export default CampaignDetailsScreen;