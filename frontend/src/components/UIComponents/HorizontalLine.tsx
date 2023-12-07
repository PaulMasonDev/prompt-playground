import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

const HorizontalLine = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return <View style={[styles.line, style]} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
  },
});

export default HorizontalLine;
