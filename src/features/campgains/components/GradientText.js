
import React, { useRef, useEffect } from 'react';
import {  View, Animated, StyleSheet } from 'react-native';
import { FONT_SIZE } from 'src/shared/constants/dimension_constants';



const GradientText = ({ text }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);

  const interpolateColors = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [ "#b473fa", "#f0972b"], 
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { color: interpolateColors, fontSize:FONT_SIZE.large }]}>
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  text: {
    fontWeight: 'bold',
  }
});

export default GradientText;
