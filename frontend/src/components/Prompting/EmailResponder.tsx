import { useState } from "react";
import { View } from "react-native";
import {
  getCoverLetterResponse,
  getEmailResponse,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { commonStyles } from "../UIComponents/commonStyles";

export const EmailResponder = () => {
  const [originalEmail, setOriginalEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handlePress = async () => {
    setLoading(
      true,
      "Brushing up on my etiquette skills!...Crafting that email for you!...Let's set you up for success!"
    );
    const apiResponse = await getEmailResponse(originalEmail, goal);
    setResponse(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = originalEmail;

  return (
    <View style={commonStyles.container}>
      <CustomTextInput
        value={originalEmail}
        onChangeText={setOriginalEmail}
        placeholder="Paste Original Email"
        multiline
        clearTextOnFocus
      />
      <CustomTextInput
        value={goal}
        onChangeText={setGoal}
        placeholder="(Optional) What outcome is desired after you send this email?"
        clearTextOnFocus
      />
      <CustomButton
        title="Submit"
        onPress={handlePress}
        disabled={!canSubmit}
      />
      {response && (
        <ResultsHeader
          prompt={`Original Email: ${originalEmail} \n Goal: ${goal}`}
          response={response}
          type="email"
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
        />
      )}
      <ResponseTextContainer response={response} responseHeader={""} />
    </View>
  );
};
