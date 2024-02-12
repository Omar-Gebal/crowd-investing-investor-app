import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import AuthPageHeader from '../components/AuthPageHeader';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from 'src/shared/components/CustomButton';
import HalfPressableSentence from '../components/HalfPressableSentence';
import DefaultVerticalSpacing from '../components/DefaultVerticalSpacing';

function SignUpScreen(props) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const fieldRequiredError = 'This field is required'

    return (
        <CustomSafeArea>
            <ScrollView style={styles.screenWrapper}>
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
                <DefaultVerticalSpacing />
                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={
                        {
                            required: fieldRequiredError
                        }
                    }
                />
                <DefaultVerticalSpacing />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    rules={
                        {
                            required: fieldRequiredError
                        }
                    }
                />
                <DefaultVerticalSpacing />
                <CustomInput
                    name="repeat_password"
                    placeholder="Repeat password"
                    control={control}
                    rules={
                        {
                            required: fieldRequiredError
                        }
                    }
                />
                <DefaultVerticalSpacing />
                <CustomButton onPress={handleSubmit(console.log('tehee'))} title="Create account" />
                <HalfPressableSentence part1={'Already have an account?'} part2={'Sign In'} />
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    screenWrapper: {
        padding: 20,
        display: 'flex',
        backgroundColor: 'white',
        height: '120%',
    }

})

export default SignUpScreen;