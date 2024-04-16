import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FONT_SIZE, MARGINS } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR, SECONDARY_COLOR } from 'src/shared/constants/colorConstants';
import NumberPad from '../components/NumberPad';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'src/shared/components/CustomButton';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import { setUserData } from 'src/shared/state/userSlice';
import { useBuySharesMutation, useGetCampaignQuery, useGetLoggedInUserQuery } from 'src/shared/state/api/apiSlice';
import DefaultActivityIndicator from 'src/shared/components/DefaultActivityIndicator';
import { setSelectedCampaign } from 'src/shared/state/campaignSlice';


function BuySharesScreen({ navigation }) {
    const numOfShares = useSelector((state) => state.numpad.number);
    const selectedCampaign = useSelector((state) => state.campaign.selectedCampaign)
    const walletAmount = useSelector((state) => state.user.userData.wallet_amount)
    const accessToken = useSelector((state) => state.user.accessToken);

    const dispatch = useDispatch();
    const [buyShares, { isLoading, error }] = useBuySharesMutation();
    const { data: updatedCampaign, refetch } = useGetCampaignQuery(selectedCampaign.id);

    async function handleBuyShare() {
        const response = await buyShares({
            accessToken,
            campaign_id: selectedCampaign.id,
            body: {
                number_of_shares: parseInt(numOfShares)
            }
        });
        if ('data' in response) {
            dispatch(setUserData(response.data));
            refetch();
        }
    }


    useEffect(() => {
        console.log('haha')
        if (updatedCampaign) {
            dispatch(setSelectedCampaign(updatedCampaign));
        }
    }, [updatedCampaign]);

    //hydration
    const { data: loggedInUser } = useGetLoggedInUserQuery(accessToken);
    useEffect(() => {
        if (loggedInUser) {
            dispatch(setUserData(loggedInUser));
        }
    }, [loggedInUser]);


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.titleStyle}>BUY <Text style={styles.highlighted}>{selectedCampaign.name}</Text> </Text>
                <Text style={styles.amtOfSharesStyle}>{selectedCampaign.remaining_shares} shares available</Text>
                <View style={styles.sharesView}>
                    <Text></Text>
                    <Text style={styles.sharesTxtStyle}>{numOfShares === '' ? '0' : numOfShares} Shares</Text>
                    <Text style={styles.EgpTxtStyle}>= EGP {numOfShares * selectedCampaign.share_price}</Text>
                </View>
                <CustomButton title={isLoading ? <DefaultActivityIndicator /> : "Buy Shares"} onPress={handleBuyShare} />
                <Text style={styles.balanceTxtStyle}>Current Wallet balance : {walletAmount} EGP</Text>
            </View>
            <View style={styles.bottom}>
                <NumberPad />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    titleStyle: {
        fontWeight: "bold",
        fontSize: FONT_SIZE.large,
        marginBottom: MARGINS.small
    },
    balanceTxtStyle: {
        fontWeight: "bold",
        fontSize: FONT_SIZE.medium,
        marginTop: 10,
        alignSelf: 'center'
    },
    amtOfSharesStyle: {
        fontSize: FONT_SIZE.medium,
        textAlign: "center",
        color: GREY_COLOR.medium
    },
    sharesView: {
        marginVertical: 10,
        alignItems: "center"
    },
    sharesTxtStyle: {
        fontWeight: "bold",
        color: PRIMARY_COLOR.dark,
        fontSize: FONT_SIZE.large
    },
    EgpTxtStyle: {
        fontSize: FONT_SIZE.medium
    },
    input: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    top: {
        paddingTop: 20,
        paddingHorizontal: "15%",
        paddingBottom: 60

    },
    bottom: {
        flex: 1,
    },
    highlighted: {
        color: SECONDARY_COLOR.main
    }
})
export default BuySharesScreen;