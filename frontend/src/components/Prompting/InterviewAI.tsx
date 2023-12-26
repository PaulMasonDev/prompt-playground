import { useRef, useState } from "react";
import {
  getEmailResponse,
  getEmployeeConnectResponse,
  getInterviewQuestionsResponse,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { CommonLayout } from "../UIComponents/CommonLayout";

export interface InterviewQuestionsPayload {
  jobDesc: string;
  website: string;
  number: string;
}

const interviewQuestionsSeed = {
  jobDesc: "",
  website: "",
  number: "1",
};

export const InterviewAI = () => {
  const [formData, setFormData] = useState<InterviewQuestionsPayload>(
    interviewQuestionsSeed
  );

  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const updateFormData = (fieldName: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handlePress = async () => {
    setLoading(true, "Loading questions for you...");
    const tempJobDesc = formData.jobDesc;
    setFormData({ ...interviewQuestionsSeed, jobDesc: tempJobDesc });
    setResponse("");
    setFeedbackSubmitted(false);
    const apiResponse = await getInterviewQuestionsResponse(formData);
    setResponse(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = formData.jobDesc;

  const inputSection = (
    <>
      <CustomTextInput
        value={formData.jobDesc}
        onChangeText={(value) => updateFormData("jobDesc", value)}
        onSubmit={handlePress}
        placeholder="Paste Job Description"
        multiline
        clearTextOnFocus
      />
      <CustomTextInput
        value={formData.website}
        onChangeText={(value) => updateFormData("website", value)}
        onSubmit={handlePress}
        placeholder="(Optional) Website of company"
        clearTextOnFocus
      />
      <CustomTextInput
        value={formData.number}
        onChangeText={(value) => updateFormData("number", value)}
        onSubmit={handlePress}
        placeholder="# of questions you want"
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
          prompt={`Job Desc: ${formData.jobDesc} | website: ${formData.website} | # of Qs: ${formData.number}`}
          response={response}
          type="interview-questions"
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
        />
      )}
      <ResponseTextContainer response={response} responseHeader={""} />
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
