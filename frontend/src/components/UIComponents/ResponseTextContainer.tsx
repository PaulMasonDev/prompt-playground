// ResponseTextContainer.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { copyToClipboard } from "../../utils/clipboard.utils";

interface ResponseTextContainerProps {
  response: string;
  responseHeader: string;
}
const ResponseTextContainer = ({
  response,
  responseHeader,
}: ResponseTextContainerProps) => {
  return (
    <ScrollView style={styles.responseTextContainer}>
      <TouchableOpacity
        onLongPress={() => copyToClipboard(responseHeader + `\n` + response)}
      >
        {responseHeader && (
          <Text style={styles.responseHeader}>{responseHeader}</Text>
        )}
        <Text style={styles.responseText}>{response}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  responseTextContainer: {
    flex: 1, // Takes the remaining space of the screen
    marginTop: 10,
    paddingLeft: 4,
  },
  responseHeader: {
    color: "#e0e0e0",
    fontSize: 24,
    fontWeight: "bold",
  },
  responseText: {
    color: "#e0e0e0", // Example style, adjust as needed
    fontSize: 18,
  },
});

export default ResponseTextContainer;
