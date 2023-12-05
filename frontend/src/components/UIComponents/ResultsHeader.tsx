import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { copyToClipboard } from "../../utils/clipboard.utils";
import { Feedback } from "./Feedback";

interface ResultsHeaderProps {
  prompt: string;
  response: string;
  type: string;
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultsHeader = ({
  prompt,
  response,
  type,
  feedbackSubmitted,
  setFeedbackSubmitted,
}: ResultsHeaderProps) => {
  return (
    <View style={styles.resultsHeaderContainer}>
      <TouchableOpacity
        style={styles.copyIcon}
        onPress={() => copyToClipboard(response)}
      >
        <Icon name="copy" size={20} color="#FFF" />
      </TouchableOpacity>
      <Feedback
        prompt={prompt}
        response={response}
        type={type}
        feedbackSubmitted={feedbackSubmitted}
        setFeedbackSubmitted={setFeedbackSubmitted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  copyIcon: {
    padding: 5,
  },
});

export default ResultsHeader;
