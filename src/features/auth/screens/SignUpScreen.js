import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import AuthPageHeader from '../components/AuthPageHeader';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from 'src/shared/components/CustomButton';
import HalfPressableSentence from '../components/HalfPressableSentence';
import DefaultVerticalSpacing from '../components/DefaultVerticalSpacing';
import { emailRegexPattern, passwordRegexPattern } from 'src/shared/utils/validators';
import FormErrorText from '../../../shared/components/FormErrorText';
import { useSignUpMutation } from 'src/shared/state/api/apiSlice';
import { dispatchCommand } from 'react-native-reanimated';
import { setAccessToken, setUserData } from 'src/shared/state/userSlice';
import DefaultActivityIndicator from 'src/shared/components/DefaultActivityIndicator';
import { useDispatch } from 'react-redux';

function SignUpScreen({ navigation }) {
    const [signUp, { isLoading, error }] = useSignUpMutation();
    const dispatch = useDispatch();
    async function handleSignUp(data) {
        const response = await signUp({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            phone_number: data.phone_number,
            date_of_birth: "2019-08-24",
            gender: "string"
        });
        console.log(response);
        if ('data' in response) {
            dispatch(setAccessToken(response.data.access_token));
            dispatch(setUserData(response.data.investor));
            navigation.replace('UploadId');
        }
    }

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            password: '',
            repeat_password: '',
        }
    });
    const fieldRequiredError = 'This field is required'
    const password = watch('password');

    return (
        <CustomSafeArea backgroundColor={'white'}>
            <ScrollView >
                <View style={styles.screenWrapper}>
                    <AuthPageHeader title={'Sign up'} subtitle={'Create a new account'} />
                    <DefaultVerticalSpacing />
                    <CustomInput
                        name="first_name"
                        placeholder="First name"
                        control={control}
                        rules={
                            {
                                required: fieldRequiredError
                            }
                        }
                    />
                    {errors.first_name && <FormErrorText text={errors.first_name.message} />}
                    <DefaultVerticalSpacing />
                    <CustomInput
                        name="last_name"
                        placeholder="Last name"
                        control={control}
                        rules={
                            {
                                required: fieldRequiredError
                            }
                        }
                    />
                    {errors.last_name && <FormErrorText text={errors.last_name.message} />}
                    <DefaultVerticalSpacing />
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
                    <DefaultVerticalSpacing />
                    <CustomInput
                        name="phone_number"
                        placeholder="Phone number"
                        keyboardType={'numeric'}
                        control={control}
                        rules={
                            {
                                required: fieldRequiredError,
                            }
                        }
                    />
                    {errors.phone_number && <FormErrorText text={errors.phone_number.message} />}
                    <DefaultVerticalSpacing />
                    <CustomInput
                        name="password"
                        placeholder="Password"
                        control={control}
                        rules={
                            {

                                required: fieldRequiredError,
                                pattern: {
                                    value: passwordRegexPattern,
                                    message: 'Password need to have at least 8 characters, 1 uppercase letter, 1 lower case letter, 1 digit and 1 special character'
                                }
                            }
                        }
                    />
                    {errors.password && <FormErrorText text={errors.password.message} />}

                    <DefaultVerticalSpacing />
                    <CustomInput
                        name="repeat_password"
                        placeholder="Repeat password"
                        control={control}
                        rules={
                            {
                                required: fieldRequiredError,
                                validate: value => value === password || 'Passwords do not match'
                            }
                        }
                    />
                    {errors.repeat_password && <FormErrorText text={errors.repeat_password.message} />}

                    <DefaultVerticalSpacing />
                    <CustomButton onPress={handleSubmit(handleSignUp)} title={isLoading ? <DefaultActivityIndicator /> : "Create account"} />
                    <HalfPressableSentence part1={'Already have an account?'} part2={'Sign In'} onPress={() => navigation.navigate("SignIn")} />
                </View>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    }

})

export default SignUpScreen;