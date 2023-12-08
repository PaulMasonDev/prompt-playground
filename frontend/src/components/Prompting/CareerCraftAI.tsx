import React, { useState } from "react";
import { View } from "react-native";
import {
  CareerCraftPayload,
  getCoverLetterResponse,
  getResumeFeedback,
  getResumeRewrite,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import { CustomTextInput } from "../UIComponents/FormElements/CustomTextInput";
import { CustomButton } from "../UIComponents/FormElements/CustomButton";
import ResultsHeader from "../UIComponents/ResultsHeader";
import ResponseTextContainer from "../UIComponents/ResponseTextContainer";
import { RadioGroup } from "../UIComponents/FormElements/RadioOptions";
import { CustomCheckbox } from "../UIComponents/FormElements/CustomCheckbox";
import { CommonLayout } from "../UIComponents/CommonLayout";
import PDFUploader from "../UIComponents/FormElements/PDFUploader";

enum CareerPrompt {
  Cover = "cover",
  ResumeFeedback = "resume",
  ResumeRewrite = "rewrite",
}

export const CareerCraftAI = () => {
  const [formData, setFormData] = useState<CareerCraftPayload>({
    resume: "",
    jobDesc: "",
    isCasual: false,
    isHumorous: false,
    isConcise: false,
    isEmoji: false,
  });

  const [type, setType] = useState<CareerPrompt>(CareerPrompt.Cover);

  const [response, setResponse] = useState("");
  const [responseHeader, setResponseHeader] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const updateFormData = (fieldName: string, value: string | boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const isCover = type === CareerPrompt.Cover;
  const isFeedback = type === CareerPrompt.ResumeFeedback;

  const resetResponseState = () => {
    setFeedbackSubmitted(false);
    setResponse("");
    setResponseHeader("");
  };

  const makeApiCall = () => {
    if (isCover) return getCoverLetterResponse(formData);
    if (isFeedback) return getResumeFeedback(formData);
    return getResumeRewrite(formData);
  };

  const updateResponseState = (apiResponse: string) => {
    setResponse(apiResponse);
    setResponseHeader(generateResponseHeaderText());
  };

  const generateResponseHeaderText = () => {
    let headerText = isCover
      ? "Cover Letter"
      : isFeedback
      ? "Resume Feedback"
      : "Resume Rewrite";
    if (isCover) {
      headerText += formData.isCasual ? " | Casual" : "";
      headerText += formData.isHumorous ? " | Humorous" : "";
      headerText += formData.isConcise ? " | Concise" : "";
      headerText += formData.isEmoji ? " | Emojis" : "";
    }
    return headerText;
  };

  const handlePress = async () => {
    setLoading(
      true,
      "Consulting my ATS bot friends...looking at the job description, looking at your resume...impressive! Just a little bit longer and I'll have what you need for you!"
    );
    resetResponseState();
    const apiResponse = await makeApiCall();
    updateResponseState(apiResponse);
    setLoading(false, "");
  };

  const canSubmit = formData.resume && formData.jobDesc;

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
      <PDFUploader setState={updateFormData} />
      <RadioGroup
        options={[
          { label: "Write Cover Letter", value: "cover" },
          { label: "Resume Feedback", value: "resume" },
          { label: "Resume Rewrite", value: "rewrite" },
        ]}
        setExternalValue={setType}
      />
      {type === "cover" ? (
        <View style={{ flexDirection: "row" }}>
          <CustomCheckbox
            label="Casual"
            onCheck={() => updateFormData("isCasual", !formData.isCasual)}
            isChecked={formData.isCasual}
          />
          <CustomCheckbox
            label="Humorous"
            onCheck={() => updateFormData("isHumorous", !formData.isHumorous)}
            isChecked={formData.isHumorous}
          />
          <CustomCheckbox
            label="Concise"
            onCheck={() => updateFormData("isConcise", !formData.isConcise)}
            isChecked={formData.isConcise}
          />
          <CustomCheckbox
            label="Emojis"
            onCheck={() => updateFormData("isEmoji", !formData.isEmoji)}
            isChecked={formData.isEmoji}
          />
        </View>
      ) : (
        <View style={{ height: 29 }}></View>
      )}
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
          prompt={`Resume: ${formData.resume} \n Job Description: ${
            formData.jobDesc
          }${isCover && formData.isCasual ? "|casual" : ""}${
            isCover && formData.isHumorous ? "|humorous" : ""
          }${isCover && formData.isConcise ? "|concise" : ""}${
            isCover && formData.isConcise ? "|emojis" : ""
          }`}
          response={response}
          type={type}
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
