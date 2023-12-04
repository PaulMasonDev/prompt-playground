import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const Spinner = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>
          Loading...This could take up to 30 seconds. Our robots are researching
          your question and becoming an expert on the topic as we speak!
        </Text>
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
  },
});

export default Spinner;
