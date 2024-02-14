import { Text, View, StyleSheet, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "src/features/auth/components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";
import { GREEN_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import HalfPressableSentence from "../components/HalfPressableSentence";
import FormErrorText from "../components/FormErrorText";
import { emailRegexPattern, passwordRegexPattern } from "src/shared/utils/validators";
import AuthPageHeader from "../components/AuthPageHeader";

function SignInScreen(props) {


    function forgotPassFn() {
        console.log("forgot pass pressed")
    }

    function registerFn() {
        console.log("Regitser btn pressed")
    }

    function handlePress(data) {
        console.log(data)
        console.log(insets)      //incest?
        console.log(navbarHeight)
        console.log("Sign-in btn pressed")
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const fieldRequiredError = 'This field is required'
    //adding fonts tele3 7war so ill do it later      //why do you have two views inside eachother? you already have a view in the authheaderpage
    return (
        <CustomSafeArea>
            <View style={styles.container}>
                                   
                    <AuthPageHeader title={'Sign in to your account'} subtitle={'Please enter your credentials'} />
                
                <View>
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
                            <CustomInput
                                name="password"
                                placeholder="Password"
                                control={control}
                                rules={
                                    {
                                        required: fieldRequiredError,
                                        pattern: {
                                            value: passwordRegexPattern,
                                            message: 'Password need to have at least 8 characters, 1 uppercase letter, 1 lower case letter, and 1 digit'
                                        }
                                    }
                                }
                            />
                            {errors.password && <FormErrorText text={errors.password.message} />}
                            <Pressable onPress={forgotPassFn}>
                                {({ pressed }) =>
                                    <Text style={{
                                        color: pressed ? GREY_COLOR.light : GREEN_COLOR,
                                        fontSize: FONT_SIZE.small,
                                        textAlign: 'right'
                                    }}>
                                        Forgot password?
                                    </Text>
                                }
                            </Pressable>
                        </View>
                        <View style={styles.submitView}>
                            <CustomButton onPress={handleSubmit(handlePress)} title="Sign-In" />
                            <HalfPressableSentence onPress={registerFn} part1={'Don\'t have an account?'} part2={'Register'} />
                        </View>
                    </View>
                </View>
            </View>
        </CustomSafeArea >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',            //add to conatsnts later
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    inputView: {
        backgroundColor: 'white',
        height: '40%',
        justifyContent: 'space-evenly'
    },
    formView: {
        paddingBottom:'5%',              //add to constants later
        backgroundColor: 'white',
        height: '90%',
        justifyContent:'space-evenly'
    },
    submitView: {
        height: '50%',
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },

})


export default SignInScreen;