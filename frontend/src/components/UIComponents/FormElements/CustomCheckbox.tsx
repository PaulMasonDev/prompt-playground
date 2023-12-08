import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome"; // or any other icon library
import { colors } from "../commonStyles";

interface CustomCheckboxProps {
  label: string;
  onCheck: (event: GestureResponderEvent) => void;
  isChecked?: boolean;
}

const iconHeight = 24;

export const CustomCheckbox = ({
  label,
  onCheck,
  isChecked,
}: CustomCheckboxProps) => {
  const iconName = isChecked ? "check-square-o" : "square-o";

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onCheck}>
      <View
        style={[
          styles.iconContainer,
          iconName === "check-square-o" && { left: 1.5 },
        ]}
      >
        <Icon name={iconName} size={iconHeight} color={colors.accent} />
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
  iconContainer: {
    position: "absolute",
    height: iconHeight,
    width: iconHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginLeft: 32,
    color: "white",
  },
});
