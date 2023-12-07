import React, { ChangeEvent, useState } from "react";
import { View } from "react-native";
import {
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

export const CareerCraftAI = () => {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isCasual, setIsCasual] = useState(false);
  const [isHumorous, setIsHumorous] = useState(false);
  const [isConcise, setIsConcise] = useState(false);

  const [type, setType] = useState("cover");

  const [response, setResponse] = useState("");
  const [responseHeader, setResponseHeader] = useState("");

  const { setLoading } = useUserStore();

  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        console.log(base64String.split(",")[1]);
        setResume(base64String.split(",")[1]); // Split to remove the data URL part
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePress = async () => {
    setLoading(
      true,
      "Consulting my ATS bot friends...looking at the job description, looking at your resume...impressive! Just a little bit longer and I'll have what you need for you!"
    );
    setFeedbackSubmitted(false);
    setResponse("");
    setResponseHeader("");
    const apiCall =
      type === "cover"
        ? getCoverLetterResponse(
            resume,
            jobDesc,
            isCasual,
            isHumorous,
            isConcise
          )
        : type === "resume"
        ? getResumeFeedback(resume, jobDesc)
        : getResumeRewrite(resume, jobDesc);
    const apiResponse = await apiCall;
    setResponse(apiResponse);
    const responseHeaderText = `${
      type === "cover"
        ? "Cover Letter"
        : type === "resume"
        ? "Resume Feedback"
        : "Resume Rewrite"
    }${isCasual ? " | Casual" : ""}${isHumorous ? " | Humorous" : ""}${
      isConcise ? " | Concise" : ""
    }`;
    setResponseHeader(responseHeaderText);
    setLoading(false, "");
  };

  const canSubmit = resume && jobDesc;

  const inputSection = (
    <>
      <CustomTextInput
        value={jobDesc}
        onChangeText={setJobDesc}
        placeholder="Paste Job Description"
        multiline
        clearTextOnFocus
      />
      {/* <CustomTextInput
        value={resume}
        onChangeText={setResume}
        placeholder="Paste Resume"
        multiline
        clearTextOnFocus
      /> */}
      <label style={{ color: "white", fontFamily: "Arial", marginRight: 5 }}>
        Upload Resume
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ margin: "10px 0", color: "white" }} // You can adjust the style as needed
        />
      </label>

      <RadioGroup
        options={[
          { label: "Write Cover Letter", value: "cover" },
          // { label: "Resume Feedback", value: "resume" }, // TODO: Turn these back on after migrating endpoints to POST requests
          // { label: "Resume Rewrite", value: "rewrite" },
        ]}
        setExternalValue={setType}
      />
      {type === "cover" ? (
        <View style={{ flexDirection: "row" }}>
          <CustomCheckbox
            label="Casual"
            onCheck={() => setIsCasual(!isCasual)}
            isChecked={isCasual}
          />
          <CustomCheckbox
            label="Humorous"
            onCheck={() => setIsHumorous(!isHumorous)}
            isChecked={isHumorous}
          />
          <CustomCheckbox
            label="Concise"
            onCheck={() => setIsConcise(!isConcise)}
            isChecked={isConcise}
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
          prompt={`Resume: ${resume} \n Job Description: ${jobDesc}${
            isCasual ? "|casual" : ""
          }${isHumorous ? "|humorous" : ""}${isConcise ? "|concise" : ""}`}
          response={response}
          type={type}
          feedbackSubmitted={feedbackSubmitted}
          setFeedbackSubmitted={setFeedbackSubmitted}
          feedbackOff={true} // TODO: Turn feedback on after debugged it
        />
      )}
      <ResponseTextContainer
        response={response}
        responseHeader={responseHeader}
      />
    </>
  );

  return (
    <CommonLayout inputSection={inputSection} outputSection={outputSection} />
  );
};
