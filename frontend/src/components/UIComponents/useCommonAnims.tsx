import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const useCommonAnims = () => {
  // Fade In Style
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeStyle = {
    opacity: fadeAnim,
  };

  // Wobble animation: rotate from -10deg to 10deg and back
  const wobbleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(wobbleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(wobbleAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const wobbleStyle = {
    transform: [
      {
        rotate: wobbleAnim.interpolate({
          inputRange: [-1, 1],
          outputRange: ["-10deg", "10deg"], // Wobble degrees
        }),
      },
    ],
  };

  return { wobbleStyle, fadeStyle };
};
