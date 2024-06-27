import { View, Text, StyleSheet } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import ProfileCard from "../components/ProfileCard";

function ProfileScreen(props) {
    return (
      <View style={styles.container}>
        <ProfileCard />
      </View>
    );
    
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%"
    }
})
export default ProfileScreen;