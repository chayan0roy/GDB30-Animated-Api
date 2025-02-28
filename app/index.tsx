
import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const StaggeredAnimation = () => {
  const animationValues = useRef([1, 2, 3, 4, 5].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      200,
      animationValues.map((value) =>
        Animated.timing(value, {
          toValue: 1,
          duration: 500, 
          useNativeDriver: true, 
        })
      )
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {animationValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.box,
            {
              opacity: animatedValue, 
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 100,
    backgroundColor: '#007bff',
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default StaggeredAnimation;
