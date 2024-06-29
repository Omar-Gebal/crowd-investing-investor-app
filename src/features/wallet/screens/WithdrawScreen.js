import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "src/features/auth/components/CustomInput";
import NumberPad from "src/features/campaigns/components/NumberPad";
import CustomButton from "src/shared/components/CustomButton";
import DefaultActivityIndicator from "src/shared/components/DefaultActivityIndicator";
import { CURRENCY } from "src/shared/constants/dataConstants";
import { FONT_SIZE, MARGINS } from "src/shared/constants/dimension_constants";
import { useTopUpWalletMutation, useWithdrawWalletMutation } from "src/shared/state/api/apiSlice";
import { clearNumber } from "src/shared/state/numPadSlice";
import { setUserData } from "src/shared/state/userSlice";

function WithdrawScreen(props) {

    const dispatch = useDispatch();
    const walletAmount = useSelector((state) => state.user.userData.wallet_amount)
    const accessToken = useSelector((state) => state.user.accessToken);

    const [withdrawWallet, { isLoading, error }] = useWithdrawWalletMutation();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            amount: "",
            bank_name: "",
            receiver_name: "",
            account_number: "",
        }
    });


    async function handleWithdraw(data) {
        const response = await withdrawWallet({
            accessToken,
            body: data
        });
        if ('data' in response) {
            console.log(response.data);
            dispatch(setUserData(response.data))
        }
    }

    const fieldRequiredError = 'This field is required'

    return (
        <View style={styles.mainContainer}>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.mainText}>How much balance do you want to withdraw?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.balanceText}>{CURRENCY} </Text>
                        <Controller
                            control={control}
                            rules={{
                                required: fieldRequiredError,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="00"
                                    style={styles.textInput}
                                    keyboardType='numeric'
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur} />
                            )}
                            name="amount"
                        />

                    </View>
                    <Text style={styles.smallText}>Available balance ={walletAmount} {CURRENCY}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <CustomInput
                        name="bank_name"
                        placeholder="Bank name (eg: CIB)"
                        control={control}
                        rules={{
                            required: fieldRequiredError,
                        }}
                    />
                    <View style={styles.inputContainer}>
                        <CustomInput
                            name="receiver_name"
                            placeholder="Receiver name"
                            control={control}
                            rules={{
                                required: fieldRequiredError,
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomInput
                            name="account_number"
                            placeholder="Account number"
                            keyboardType="numeric"
                            control={control}
                            rules={{
                                required: fieldRequiredError,
                            }}
                        />
                    </View>
                </View>
            </View>
            <CustomButton title={isLoading ? <DefaultActivityIndicator /> : "Confirm"} onPress={handleSubmit(handleWithdraw)} />

        </View>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: '5%',
        paddingBottom: 30,
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    balanceText: {
        fontWeight: 'bold',
        fontSize: FONT_SIZE.medium,
    },
    smallText: {
        fontSize: FONT_SIZE.small,

    },
    mainText: {
        fontSize: FONT_SIZE.medium,
    },

    textInput: {
        fontSize: FONT_SIZE.medium
    },
    inputContainer: {
        marginTop: MARGINS.medium
    }
});


export default WithdrawScreen;