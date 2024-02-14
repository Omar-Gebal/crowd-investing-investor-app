import { View, StyleSheet } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import AuthPageHeader from "../components/AuthPageHeader";
import { useForm } from "react-hook-form";
import FormErrorText from "../components/FormErrorText";
import CustomInput from "../components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";
import { emailRegexPattern } from "src/shared/utils/validators";

export default function ForgotPassScreen(props) {

    function handlePress(data){
        console.log(data);
        console.log("Next pressed");

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
        </CustomSafeArea>
    );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingHorizontal:'5%',              //add to constants later
        height:'100%',
        justifyContent:'space-between'
    },
    formView:{
        paddingBottom:'5%',                  //add to constants later
        backgroundColor:'white',
        height:'80%',
        justifyContent:'space-between'
    }
})

 
