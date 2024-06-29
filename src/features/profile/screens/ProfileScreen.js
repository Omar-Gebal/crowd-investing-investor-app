import { View, Text, StyleSheet } from "react-native";
import CustomSafeArea from "src/shared/components/CustomSafeArea";
import ProfileCard from "../components/ProfileCard";

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ProfileCard navigation={navigation} />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
})
export default ProfileScreen;