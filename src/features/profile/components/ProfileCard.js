import { StyleSheet, View, Text } from "react-native";
import { useForm } from "react-hook-form";
import Pfp from "./Pfp";
import Field from "./Field";
import CustomButton from "src/shared/components/CustomButton";
import FormErrorText from "src/shared/components/FormErrorText";
import DefaultVerticalSpacing from "src/features/auth/components/DefaultVerticalSpacing";



function ProfileCard(props) {
    
   
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {          //adjust defaults
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',      //didnt add validation for the phone number to be a number
        }
    });

    const onSubmit = (data) => console.log(data)

    return (
        <View style={styles.container}>
            
                <Pfp />
                <View style={styles.formStyle}>
                    <Field control={control} name="first_name" placeholder="First Name" rules={{required: true}}/>
                    {errors.first_name && <FormErrorText text={"first name required"} />}
                  
                    <Field control={control} name="last_name" placeholder="Last Name" rules={{required: true}}/>
                    {errors.last_name && <FormErrorText text={"Last name required"} />}
                
                    <Field control={control} name="email" placeholder="E-mail" rules={{required: true}}/>
                    {errors.email && <FormErrorText text={"email is required"} />}
                  
                    <Field control={control} name="phone_number" placeholder="Phone" rules={{required: true}}/>  
                    {errors.phone_number && <FormErrorText text={"Phone number required"} />}
                    <View style={styles.btnView}>
                        <CustomButton onPress={handleSubmit(onSubmit)} title="Save changes"/>
                    </View>
                </View>
            
        </View>
    );
   
}
const styles = StyleSheet.create({
    container:{
        width:400,
        height:500,
        elevation:10,
        zIndex:10,
        borderRadius:10,
        padding:10,
        backgroundColor:"white",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    formStyle:{
        margin:50,
        height:300,
        padding:1,  
        justifyContent:"space-between" 
    },
    btnView:{

    }
   
})
export default ProfileCard;