import { useState } from "react";
import { View } from "react-native";
import { getPromptResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/CustomTextInput";
import { CustomButton } from "../UIComponents/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { commonStyles } from "../UIComponents/commonStyles";

export const ExpertAI = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseHeader, setResponseHeader] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handlePress = async () => {
    setFeedbackSubmitted(false);
    setLoading(
      true,
      "Loading...This could take up to 30 seconds. Our robots are researching your question and becoming an expert on the topic as we speak!"
    );
    const apiResponse = await getPromptResponse(prompt);
    setResponseHeader(prompt);
    setResponse(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = prompt;

  return (
    <View style={commonStyles.container}>
      <CustomTextInput
        value={prompt}
        onChangeText={setPrompt}
        placeholder="What do you want to know how to do?"
        clearTextOnFocus
      />
      <CustomButton
        title="Submit"
        onPress={handlePress}
        disabled={!canSubmit}
      />
      {response && (
        <ResultsHeader
          prompt={prompt}
          response={response}
          type="expert"
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
        />
      )}

      <ResponseTextContainer
        response={response}
        responseHeader={responseHeader}
      />
    </View>
  );
};
