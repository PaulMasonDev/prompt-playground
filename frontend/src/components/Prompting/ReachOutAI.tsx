import { useRef, useState } from "react";
import {
  getEmailResponse,
  getEmployeeConnectResponse,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { CommonLayout } from "../UIComponents/CommonLayout";

export interface ReachOutPayload {
  jobDesc: string;
  name: string;
  title: string;
}

const reachOutSeed = {
  jobDesc: "",
  name: "",
  title: "",
};

export const ReachOutAI = () => {
  const [formData, setFormData] = useState<ReachOutPayload>(reachOutSeed);

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
    setLoading(
      true,
      "Brushing up on my etiquette skills!...Crafting that message for you!...Let's set you up for success!"
    );
    const tempJobDesc = formData.jobDesc;
    setFormData({ ...reachOutSeed, jobDesc: tempJobDesc });
    setResponse("");
    setFeedbackSubmitted(false);
    const apiResponse = await getEmployeeConnectResponse(formData);
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
        value={formData.name}
        onChangeText={(value) => updateFormData("name", value)}
        onSubmit={handlePress}
        placeholder="Name of person you are reaching out to"
        clearTextOnFocus
      />
      <CustomTextInput
        value={formData.title}
        onChangeText={(value) => updateFormData("title", value)}
        onSubmit={handlePress}
        placeholder="Title of person you are reaching out to"
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
          prompt={`Job Desc: ${formData.jobDesc} | title: ${formData.title}`}
          response={response}
          type="employee-connect"
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
