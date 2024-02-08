import { SafeAreaView, Text, View, StyleSheet } from "react-native";


function Sign_in_screen(props) {
    return (
        <SafeAreaView style={styles.container}> 
            <Text>Sign in to your ~{"\n"} Account</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
    paddingTop: 30
    }
})


export default Sign_in_screen;