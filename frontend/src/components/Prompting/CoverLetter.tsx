import { useState } from "react";
import { View } from "react-native";
import {
  getCoverLetterResponse,
  getResumeFeedback,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { commonStyles } from "../UIComponents/commonStyles";
import { RadioGroup } from "../UIComponents/FormElements/RadioOptions";

export const CoverLetter = () => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [type, setType] = useState("cover");
  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handlePress = async () => {
    setLoading(
      true,
      "Consulting my ATS bot friends...looking at the job description, looking at your resume...impressive! Just a little bit longer and I'll have what you need for you!"
    );
    const apiCall =
      type === "cover" ? getCoverLetterResponse : getResumeFeedback;
    const apiResponse = await apiCall(resume, jobDesc);
    setResponse(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = resume && jobDesc;

  return (
    <View style={commonStyles.container}>
      <CustomTextInput
        value={jobDesc}
        onChangeText={setJobDesc}
        placeholder="Paste Job Description"
        multiline
        clearTextOnFocus
      />
      <CustomTextInput
        value={resume}
        onChangeText={setResume}
        placeholder="Paste Resume"
        multiline
        clearTextOnFocus
      />
      <RadioGroup
        options={[
          { label: "Write Cover Letter", value: "cover" },
          { label: "Resume Feedback", value: "resume" },
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
          prompt={`Resume: ${resume} \n Job Description: ${jobDesc}`}
          response={response}
          type={type}
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
        />
      )}
      <ResponseTextContainer response={response} responseHeader={""} />
    </View>
  );
};
