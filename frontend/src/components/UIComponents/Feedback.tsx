import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { FeedbackPayload, sendFeedback } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { useCommonAnims } from "./useCommonAnims";
import { colors } from "./commonStyles";

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
    setLoading(
      true,
      "Thanks so much for sharing your thoughts with us! Your feedback is invaluable and helps us grow better every day. We're now processing your input with care. This might take a few seconds, but rest assured, it's time well spent in our quest to provide you with an even better experience. Stay tuned!"
    );
    await sendFeedback({ ...props, rating });
    setFeedbackSubmitted(true);
    setLoading(false, "");
  };

  // TODO: Add a single field in db for user to write what was good / what needs work.
  // Could be done after the user clicks the thumbs up. Focus goes to new input and then they hit a submit btn
  // or something.
  return !feedbackSubmitted ? (
    <Animated.View style={[styles.container, fadeStyle]}>
      <Text style={[styles.feedbackPrompting]}>How did I do?</Text>
      <View style={[styles.thumbs]}>
        <Icon
          name="thumbs-up"
          size={20}
          color={colors.positiveFeedback}
          style={{ marginRight: 10 }}
          onPress={() => handlePress("positive")}
        />
        <Icon
          name="thumbs-down"
          size={20}
          color={colors.negativeFeedback}
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
