import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NumberPad from "src/features/campgains/components/NumberPad";
import CustomButton from "src/shared/components/CustomButton";
import DefaultActivityIndicator from "src/shared/components/DefaultActivityIndicator";
import { FONT_SIZE, MARGINS } from "src/shared/constants/dimension_constants";
import { useTopUpWalletMutation } from "src/shared/state/api/apiSlice";
import { clearNumber } from "src/shared/state/numPadSlice";
import { setUserData } from "src/shared/state/userSlice";

function TopUpScreen(props) {

    const dispatch = useDispatch();
    const top_up_amount = useSelector((state) => state.numpad.number);
    const accessToken = useSelector((state) => state.user.accessToken);


    const [topUpWallet, { isLoading, error }] = useTopUpWalletMutation();

    async function handleTopUp() {
        const response = await topUpWallet({
            accessToken,
            body: {
                amount: parseInt(top_up_amount),
            }
        });
        if ('data' in response) {
            dispatch(setUserData(response.data))
        }
    }

    useEffect(() => {
        dispatch(clearNumber());
    }, []);
    return (<>
        <View style={styles.mainContainer}>
            <View style={styles.top}>
                <Text style={styles.mainText}>How much balance do you want to add to your wallet ?</Text>
                <Text style={styles.balanceText}>EGP {top_up_amount === '' ? '00' : top_up_amount}</Text>
                <CustomButton title={isLoading ? <DefaultActivityIndicator /> : "Confirm"} onPress={handleTopUp} />
            </View>

        </View>
        <NumberPad />
    </>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: '5%',
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
    },
    balanceText: {
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
        marginBottom: MARGINS.large,
    },
    mainText: {
        fontSize: FONT_SIZE.medium,
    },
    top: {
        marginBottom: MARGINS.large * 9,
    }
});


export default TopUpScreen;