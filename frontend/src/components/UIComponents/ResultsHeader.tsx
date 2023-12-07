import React from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { copyToClipboard } from "../../utils/clipboard.utils";
import { Feedback } from "./Feedback";
import { useCommonAnims } from "./useCommonAnims";

interface ResultsHeaderProps {
  prompt: string;
  response: string;
  type: string;
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  feedbackOff: boolean;
}

const ResultsHeader = ({
  prompt,
  response,
  type,
  feedbackSubmitted,
  setFeedbackSubmitted,
  feedbackOff,
}: ResultsHeaderProps) => {
  const { wobbleStyle } = useCommonAnims();

  return (
    <View style={styles.resultsHeaderContainer}>
      <Animated.View style={[styles.copyIcon, wobbleStyle]}>
        <TouchableOpacity onPress={() => copyToClipboard(response)}>
          <Icon name="copy" size={20} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>

      {!feedbackOff && (
        <Feedback
          prompt={prompt}
          response={response}
          type={type}
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingLeft: 0,
    paddingRight: 20,
  },
  copyIcon: {
    padding: 5,
  },
});

export default ResultsHeader;
