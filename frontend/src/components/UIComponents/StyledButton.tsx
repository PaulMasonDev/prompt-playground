import { useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface StyledButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  outlineColor?: string;
}
export const StyledButton = ({
  title,
  onPress,
  outlineColor = "#007BFF",
}: StyledButtonProps) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateScale = (newValue: number) => {
    Animated.spring(scaleValue, {
      toValue: newValue,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={() => animateScale(0.95)}
      onPressOut={(event) => {
        animateScale(1);
        onPress(event);
      }}
      style={[styles.button, { borderColor: outlineColor }]}
    >
      <Animated.Text
        style={[styles.buttonText, { transform: [{ scale: scaleValue }] }]}
      >
        {title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007BFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
