import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { FeedbackPayload, sendFeedback } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { useCommonAnims } from "./useCommonAnims";

export const Feedback = ({
  feedbackSubmitted,
  setFeedbackSubmitted,
  ...props
}: Omit<FeedbackPayload, "rating"> & {
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setLoading } = useUserStore();

  const { fadeStyle } = useCommonAnims();

  const handlePress = async (rating: string) => {
    setLoading(true);
    await sendFeedback({ ...props, rating });
    setFeedbackSubmitted(true);
    setLoading(false);
  };

  return !feedbackSubmitted ? (
    <Animated.View style={[styles.container, fadeStyle]}>
      <Text style={[styles.feedbackPrompting]}>How did I do?</Text>
      <View style={[styles.thumbs]}>
        <Icon
          name="thumbs-up"
          size={20}
          color="green"
          style={{ marginRight: 10 }}
          onPress={() => handlePress("positive")}
        />
        <Icon
          name="thumbs-down"
          size={20}
          color="#db2727"
          onPress={() => handlePress("negative")}
        />
      </View>
    </Animated.View>
  ) : (
    <Text style={[styles.feedbackPrompting]}>Thank you for your feedback!</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  thumbs: {
    flexDirection: "row",
  },
  feedbackPrompting: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    marginRight: 10,
  },
});
