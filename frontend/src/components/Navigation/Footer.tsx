import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../UIComponents/commonStyles";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2023 Paul Mason. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: colors.primary,
  },
});

export default Footer;
