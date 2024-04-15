import { Pressable, StyleSheet, Text } from 'react-native';
import { GREY_COLOR, PRIMARY_COLOR } from 'src/shared/constants/colorConstants';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';

function Chip({ title, onPress, locked }) {

  //console.log(title + " chip pressed "+ locked);
  return (
    <Pressable onPress={onPress} style={[styles.container, locked && styles.containerPressed]}>
      <Text style={[styles.titleStyle, locked && styles.titlePressedStyle]}>{title}</Text>
    </Pressable>
  );

}
const styles = StyleSheet.create({
  container: {
    borderColor: GREY_COLOR.lightest,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 20,
    paddingVertical: 10,

  },
  containerPressed: {
    backgroundColor: PRIMARY_COLOR.main,
  },
  titleStyle: {
    textAlign: "center",
    color: GREY_COLOR.medium,
    fontSize: FONT_SIZE.medium
  },
  titlePressedStyle: {
    color: 'white'
  },
})

export default Chip;