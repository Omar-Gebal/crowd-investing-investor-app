
import { StyleSheet, View , Text} from 'react-native';
import { useFonts } from 'expo-font';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';

function Pfp(props) {
    const[fontsLoaded, fontError] = useFonts({
        'Migae': require('assets/fonts/MigaeSemibold-3zd2M.otf')
    });
    return (
       <View style={styles.container}> 
        <Text style={{fontFamily:"Migae", fontSize:50}}>MJ</Text>
       </View>
    );
   
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:PRIMARY_COLOR.light,
        borderRadius:100,
        width:100,
        height:100,
        justifyContent:"center",
        alignItems:"center"
    }


})

export default Pfp;