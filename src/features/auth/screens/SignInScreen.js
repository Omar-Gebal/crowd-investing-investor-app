import { Text, View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "src/features/auth/components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { PRIMARY_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import HalfPressableSentence from "../components/HalfPressableSentence";
import FormErrorText from "../components/FormErrorText";
import { emailRegexPattern, passwordRegexPattern } from "src/shared/utils/validators";
import AuthPageHeader from "../components/AuthPageHeader";
import { useSignInMutation } from "src/shared/state/api/apiSlice";
import DefaultVerticalSpacing from "../components/DefaultVerticalSpacing";
import DefaultActivityIndicator from "src/shared/components/DefaultActivityIndicator";
import { useDispatch } from "react-redux";
import { setAccessToken } from "src/shared/state/userSlice";

function SignInScreen({ navigation }) {

    const [signIn, { isLoading, error }] = useSignInMutation();
    const dispatch = useDispatch();


    function forgotPassFn() {
        navigation.navigate("ForgetPass")
        console.log("forgot pass pressed")
    }

    function registerFn() {
        navigation.navigate("SignUp")
        console.log("register btn pressed")

    }

    async function handleSignIn(data) {
        const response = await signIn(data);
        if ('data' in response) {
            // console.log();
            dispatch(setAccessToken(response.data.access_token));
            navigation.replace('TabNavigator');
        }
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const fieldRequiredError = 'This field is required'
    return (
        <CustomSafeArea backgroundColor="white">
            <View style={styles.container}>
                <AuthPageHeader title={'Sign in to your account'} subtitle={'Please enter your credentials'} />
                <DefaultVerticalSpacing />
                <View style={styles.formView}>
                    <View style={styles.inputView}>
                        <CustomInput
                            name="email"
                            placeholder="Email"
                            control={control}
                            rules={
                                {
                                    required: fieldRequiredError,
                                    pattern: {
                                        value: emailRegexPattern,
                                        message: 'Email format invalid'
                                    }
                                }
                            }
                        />
                        {errors.email && <FormErrorText text={errors.email.message} />}
                        {error && <FormErrorText text={'Wrong Email or Password'} />}
                        <DefaultVerticalSpacing />
                        <CustomInput
                            name="password"
                            placeholder="Password"
                            control={control}
                            secureTextEntry={true}
                            rules={
                                {
                                    required: fieldRequiredError,
                                }
                            }
                        />
                        {errors.password && <FormErrorText text={errors.password.message} />}
                        <Pressable onPress={forgotPassFn} style={styles.forgotPassTxtStyle}>
                            {({ pressed }) =>
                                <Text style={{
                                    color: pressed ? GREY_COLOR.light : PRIMARY_COLOR.main_lighter,
                                    fontSize: FONT_SIZE.small,
                                    textAlign: 'right'
                                }}>
                                    Forgot password?
                                </Text>
                            }
                        </Pressable>
                    </View>
                    <View style={styles.submitView}>
                        <CustomButton onPress={handleSubmit(handleSignIn)} title={isLoading ? <DefaultActivityIndicator /> : "Sign in"} />
                        <HalfPressableSentence onPress={registerFn} part1={'Don\'t have an account?'} part2={'Register'} />
                    </View>
                </View>
            </View>
        </CustomSafeArea >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    inputView: {
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    formView: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    submitView: {
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    forgotPassTxtStyle:{
        marginTop:10
    }

})


export default SignInScreen;