import { useState } from "react";
import { getPromptResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { RadioGroup } from "../UIComponents/FormElements/RadioOptions";
import { CommonLayout } from "../UIComponents/CommonLayout";

export const ExpertAI = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");
  const [responseHeader, setResponseHeader] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handlePress = async () => {
    setResponseHeader("");
    setResponse("");
    setFeedbackSubmitted(false);
    setLoading(
      true,
      "Loading...This could take up to 30 seconds. Our robots are researching your question and becoming an expert on the topic as we speak!"
    );
    const apiResponse = await getPromptResponse(prompt, type);
    const headerType = type ? ` (${type})` : "";
    setResponseHeader(`${prompt}${headerType}`);
    setResponse(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = prompt;

  const inputSection = (
    <>
      <RadioGroup
        // TODO: This functionality should be applied everywhere.
        options={[
          { label: "English", value: "" },
          { label: "Mandarin", value: "Mandarin Language" },
          { label: "Spanish", value: "Spanish Language" },
          { label: "Hindi", value: "Hindi Language" },
          { label: "Bengali", value: "Bengali Language" },
          { label: "Portuguese", value: "Portuguese Language" },
          { label: "Russian", value: "Russian Language" },
          { label: "Arabic", value: "Arabic Language" },
          { label: "French", value: "French Language" },
          { label: "Pirate", value: "Pirate" },
          { label: "Fifth Grader", value: "5th Grade Teacher" },
        ]}
        setExternalValue={setType}
      />
      <CustomTextInput
        value={prompt}
        onChangeText={setPrompt}
        onSubmit={handlePress}
        placeholder="What do you need assistance with?"
        clearTextOnFocus
      />
      <CustomButton
        title="Submit"
        onPress={handlePress}
        disabled={!canSubmit}
      />
    </>
  );

  const outputSection = (
    <>
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
    </>
  );

  return (
    <CommonLayout
      inputSection={inputSection}
      outputSection={outputSection}
      isResponseVisible={response !== ""}
    />
  );
};
