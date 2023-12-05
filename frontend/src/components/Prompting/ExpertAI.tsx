import { useState } from "react";
import { View } from "react-native";
import { getPromptResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { commonStyles } from "../UIComponents/commonStyles";
import { RadioGroup } from "../UIComponents/FormElements/RadioOptions";

export const ExpertAI = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
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
    const apiResponse = await getPromptResponse(prompt, type);
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
      <RadioGroup
        options={[
          { label: "English", value: "" },
          { label: "Spanish", value: "spanish" },
          { label: "Pirate", value: "pirate" },
          { label: "Fifth Grader", value: "5th grader" },
        ]}
        setExternalValue={setType}
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
