import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const Spinner = ({
  isLoading,
  message,
}: {
  isLoading: boolean;
  message: string;
}) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  message: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 20,
    padding: 40,
    backgroundColor: "#0f3460",
  },
});

export default Spinner;
