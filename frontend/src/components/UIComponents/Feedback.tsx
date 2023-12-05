import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { FeedbackPayload, sendFeedback } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";

export const Feedback = ({
  feedbackSubmitted,
  setFeedbackSubmitted,
  ...props
}: Omit<FeedbackPayload, "rating"> & {
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setLoading } = useUserStore();
  const handlePress = async (rating: string) => {
    setLoading(true);
    await sendFeedback({ ...props, rating });
    setFeedbackSubmitted(true);
    setLoading(false);
  };
  return !feedbackSubmitted ? (
    <View style={[styles.container]}>
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
    </View>
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
    fontSize: 16,
    padding: 5,
  },
});
