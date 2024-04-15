import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { concatNumber, removeNumber } from 'src/shared/state/numPadSlice';
import { PRIMARY_COLOR } from 'src/shared/constants/colorConstants';


function NumberPad(props) {
    const dispatch = useDispatch()

    function onNumberClick(num) {
        dispatch(concatNumber(`${num}`));
    }
    return (
        <View style={styles.container}>
            <View style={[styles.column, styles.firstColumn]}>
                <TouchableOpacity onPress={() => onNumberClick(1)}><Text style={styles.number}>1</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(4)}><Text style={styles.number}>4</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(7)}><Text style={styles.number}>7</Text></TouchableOpacity>
            </View>
            <View style={[styles.column, styles.secondColumn]}>
                <TouchableOpacity onPress={() => onNumberClick(2)}><Text style={styles.number}>2</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(5)}><Text style={styles.number}>5</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(8)}><Text style={styles.number}>8</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(0)}><Text style={styles.number}>0</Text></TouchableOpacity>
            </View>
            <View style={[styles.column, styles.thirdColumn]}>
                <TouchableOpacity onPress={() => onNumberClick(3)}><Text style={styles.number}>3</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(6)}><Text style={styles.number}>6</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onNumberClick(9)}><Text style={styles.number}>9</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removeNumber())}><Feather name="delete" size={30} color={"black"} /></TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: 50,
        paddingHorizontal: "20%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        backgroundColor: PRIMARY_COLOR.main,
        justifyContent: "space-between"

    },
    number: {
        fontSize: 35,
        fontWeight: "bold"
    },
    column: {
        rowGap: 25
    },
    firstColumn: {

    },
    secondColumn: {

    },
    thirdColumn: {

    }
})
export default NumberPad;