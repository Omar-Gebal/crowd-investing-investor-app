import { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { FONT_SIZE, GREY_COLOR } from "src/shared/constants/dimension_constants";


function CustomModal({mainTxt, subTxt, visible, onPress}) {
    return (
        <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={visible}
        >
        <View style={styles.centeredView} >
        <View style={styles.modalView}>
        <Text style={styles.modalText}>{mainTxt}</Text>
        <Text style={styles.modalSmallerText}>{subTxt}</Text>
            <CustomButton title="Got it!"  onPress={onPress}/>
        </View>
        </View>
    </Modal>

    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 10,
        shadowOffset: { width: 10, height: 10 },  
        shadowColor: 'black',  
        shadowOpacity: 1,  
        },
    modalText: {
        fontSize:FONT_SIZE.medium,
        fontWeight:'bold',
        marginBottom: '2%',
        textAlign: 'center',
          },
    modalSmallerText:{
        textAlign:'center',
        fontSize:FONT_SIZE.small,
        color:GREY_COLOR.medium,
        marginBottom:'2%'
    }
})

export default CustomModal;