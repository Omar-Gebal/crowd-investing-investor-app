import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import CustomInput from "src/features/auth/components/CustomInput";
import CustomButton from "src/shared/components/CustomButton";

function Sign_in_screen(props) {

    function handlePress(data){
        console.log(data)
        console.log("Sign-in btn pressed")
    }




    const {control, handleSubmit} =useForm();
    return (
        <SafeAreaView style={styles.container}> 
            <Text style={{fontSize:30}}>Sign in to your {"\n"} Account</Text>
            <View>
                <CustomInput 
                name="username"
                placeHolder="Username"
                control={control}
                />
                <CustomInput 
                name="password"
                placeHolder="Password"
                control={control}/>

                <CustomButton onPress={handleSubmit(handlePress)} title="Sign-In" />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
    padding:"10%"
    }
})


export default Sign_in_screen;