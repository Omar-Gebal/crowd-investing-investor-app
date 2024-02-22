import { View, StyleSheet, } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import AuthPageHeader from "src/features/auth/components/AuthPageHeader";
import { useForm } from "react-hook-form";
import FormErrorText from "src/features/auth/components/FormErrorText";
import CustomInput from "src/features/auth/components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";
import { emailRegexPattern } from "src/shared/utils/validators";
import { useState } from "react";
import CustomModal from "src/features/auth/components/CustomModal";


export default function ForgotPassScreen({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false)

    function handleModal() {
        setModalVisible(!modalVisible);
    }

    function handlePress(data) {
        console.log(data);
        handleModal();
        console.log("Next pressed");
        navigation.navigate("NewPassword")

    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: ""
        }
    });


    const fieldRequiredError = 'This field is required'
    return (
        <CustomSafeArea>
            <View style={styles.container}>
                <AuthPageHeader title={'Forgot Password'} subtitle={'Enter your email account to reset your password'} />
                <View style={styles.formView}>
                    <View>
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
                    </View>
                    <CustomButton onPress={handleSubmit(handlePress)} title="Next" />
                </View>
            </View>
            <CustomModal mainTxt="Check your email" subTxt="We have sent instructions to recover your password to your inbox" visible={modalVisible} onPress={handleModal} />
        </CustomSafeArea>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0000',
        paddingHorizontal: '5%',              //add to constants later
        height: '100%',
        justifyContent: 'space-between'
    },
    formView: {
        paddingBottom: '5%',                  //add to constants later
        backgroundColor: '#0000',
        height: '80%',
        justifyContent: 'space-between'
    },

});


