import { View, StyleSheet, Text } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { GREY_COLOR } from 'src/shared/constants/colorConstants';

function AuthPageHeader({ title, subtitle }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titelText}>{title}</Text>
            <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
    );
}

export default AuthPageHeader;

const styles = StyleSheet.create({
    container:{
        margin:'5%',                //i think we should put styles on the header here bcs the paddings and margins are not consistant in both sign in and signup 
        backgroundColor:'white'    //ok i did it 
    
    },                             
    titelText: {
        fontSize: FONT_SIZE.large,
        marginBottom:'2%',
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: FONT_SIZE.small,
        color: GREY_COLOR.medium,
    }
})