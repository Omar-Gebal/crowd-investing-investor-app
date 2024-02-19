import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomSafeArea from 'src/shared/components/CustomSafeArea';
import AuthPageHeader from 'src/features/auth/components/AuthPageHeader';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { passwordRegexPattern } from 'src/shared/utils/validators';
import DefaultVerticalSpacing from '../components/DefaultVerticalSpacing';
import CustomButton from 'src/shared/components/CustomButton';
import FormErrorText from 'src/features/auth/components/FormErrorText';
import CustomModal from '../components/CustomModal';
function NewPasswordScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);

    function handleModal() {
        setModalVisible(!modalVisible);
    }


    function handlePress(data) {
        console.log(data);
        handleModal();
        console.log("reset pass btn")
    }

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            password: '',
            repeat_password: ''
        }
    });
    const fieldRequiredError = 'This field is required';
    const password = watch('password');
    return (
        <CustomSafeArea>
            <View style={styles.container}>
                <AuthPageHeader title="New password" subtitle="Your new password must be different from previously used password" />
                <View style={styles.formView}>
                    <View>
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
                    </View>
                    <CustomButton title="Reset Password" onPress={handleSubmit(handlePress)} />
                </View>
                <CustomModal mainTxt="Reset succesful" subTxt="please re-login to get started" visible={modalVisible} onPress={handleModal} />
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    formView: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'space-between',
    },
})


export default NewPasswordScreen;