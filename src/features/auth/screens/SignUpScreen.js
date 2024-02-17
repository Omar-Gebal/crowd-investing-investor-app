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
import FormErrorText from '../components/FormErrorText';
import { SafeAreaView } from 'react-native-safe-area-context';

function SignUpScreen(props) {

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            repeat_password: '',
        }
    });
    const fieldRequiredError = 'This field is required'
    const password = watch('password');

    return (
        <CustomSafeArea >
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
                    <CustomButton onPress={handleSubmit(console.log('TEEHE'))} title="Create account" />
                    <HalfPressableSentence part1={'Already have an account?'} part2={'Sign In'} />
                </View>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    }

})

export default SignUpScreen;