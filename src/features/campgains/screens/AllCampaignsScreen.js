import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import DefaultActivityIndicator from 'src/shared/components/DefaultActivityIndicator';
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'src/shared/constants/colorConstants';
import { useGetAllCampaignsQuery } from 'src/shared/state/api/apiSlice';
import CampaignCard from '../components/CampgainCard';

function AllCamaignsScreen({ navigation }) {
    const { data, isLoading, error } = useGetAllCampaignsQuery();

    const renderItem = ({ item }) => <CampaignCard campaign={item} navigation={navigation} />;
    if (error) {
        console.warn(error);
    }

    return (
        <CustomSafeArea>
            <View style={styles.screenWrapper}>
                {isLoading ? (
                    <DefaultActivityIndicator color={PRIMARY_COLOR.main} isLarge={true} />
                ) : (
                    <FlatList
                        data={data?.campaigns || []}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
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


export default AllCamaignsScreen;