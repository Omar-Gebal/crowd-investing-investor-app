import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { PRIMARY_COLOR, GREY_COLOR } from "src/shared/constants/colorConstants";
import { FONT_SIZE } from "src/shared/constants/dimension_constants";

function HalfPressableSentence({ onPress, part1, part2 }) {
    return (
        <View style={styles.container}>
            <Text style={styles.part1}>{`${part1} `}</Text>
            <Pressable onPress={onPress}>
                {
                    ({ pressed }) => <Text style={{ color: pressed ? GREY_COLOR.light : PRIMARY_COLOR.main_lighter, fontSize: FONT_SIZE.small }}>{`${part2}`}</Text>
                }
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginTop: 5,
    },
    part1: {
        color: GREY_COLOR.medium,
        fontSize: FONT_SIZE.small
    },
})


export default HalfPressableSentence;