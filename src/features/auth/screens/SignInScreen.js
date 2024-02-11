import { SafeAreaView, Text, View, StyleSheet, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "src/features/auth/components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";

function SignInScreen(props) {

    function handlePress(data) {
        console.log(data)
        console.log("Sign-in btn pressed")
    }

    function forgotPassFn() {
        console.log("forgot pass pressed")
    }

    function registerFn() {
        console.log("Regitser btn pressed")
    }



    const { control, handleSubmit } = useForm();
    //adding fonts tele3 7war so ill do it later
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titelText}>Sign in to your Account</Text>
                <Text style={{ fontSize: FONT_SIZE.small, color: GREY_COLOR.medium }}>Please enter your credentials</Text>
            </View>
            <View>
                <View style={styles.formView}>
                    <View style={styles.inputView}>
                        <CustomInput
                            name="email"
                            placeHolder="Email"
                            control={control}
                        />
                        <CustomInput
                            name="password"
                            placeHolder="Password"
                            control={control} />
                        <Pressable onPress={forgotPassFn}>
                            {({ pressed }) =>
                                <Text style={{
                                    color: pressed ? 'rgba(172,181,187,0.5)' : GREEN_COLOR,
                                    fontSize: FONT_SIZE.small,
                                    textAlign: 'right'
                                }}>Forgot password?</Text>
                            }
                        </Pressable>
                    </View>
                    <View style={styles.submitView}>
                        <CustomButton onPress={handleSubmit(handlePress)} title="Sign-In" />
                        <Text style={{ color: GREY_COLOR.medium, textAlign: 'center' }}>Don't have an account?
                            <Text style={{
                                color: GREEN_COLOR,
                                fontSize: FONT_SIZE.small,
                            }} onPress={registerFn}> Register</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    inputView: {
        backgroundColor: 'white',
        height: '40%',
        justifyContent: 'space-evenly'
    },
    formView: {
        marginTop: '10%',
        backgroundColor: 'white',
        height: '90%',
        justifyContent: 'space-evenly'
    },
    submitView: {
        height: '50%',
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    titelText: {
        fontSize: FONT_SIZE.large,
        fontWeight: 'bold',
    }

})


export default SignInScreen;