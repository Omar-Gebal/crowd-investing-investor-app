
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from './ActionButton';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { BLACK_COLOR, PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmountsHidden } from 'src/shared/state/userSlice';
function BlockOfActions({ navigation }) {
    const dispatch = useDispatch();
    const hidden = useSelector((state) => state.user.amountsHidden);


    function Hide() {
        dispatch(setAmountsHidden(!hidden))
    }
    return (
        <View style={styles.container}>
            <ActionButton icon={<AntDesign name="pluscircle" size={50} color={"white"} />} text="top up" onPress={() => navigation.navigate('TopUp')} />
            <ActionButton icon={<AntDesign name="minuscircleo" size={50} color={"white"} />} text="withdraw" onPress={() => navigation.navigate('Withdraw')} />
            {hidden ? <ActionButton icon={<Feather name="eye-off" size={50} color={"white"} />} text="Hide" onPress={Hide} /> : <ActionButton icon={<Feather name="eye" size={50} color={"white"} />} text="Hide" onPress={Hide} />}
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        position: 'absolute',
        zIndex: 100,
        borderRadius: 20,
        top: -50,
        elevation: 1,
        backgroundColor: PRIMARY_COLOR.main,
        width: "80%",
        height: 110,
    }
})

export default BlockOfActions;