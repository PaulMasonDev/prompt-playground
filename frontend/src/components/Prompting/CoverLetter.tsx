import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getCoverLetterResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import Icon from "@expo/vector-icons/FontAwesome"; // Or any other icon set you prefer
import { CustomTextInput } from "../UIComponents/CustomTextInput";
import { CustomButton } from "../UIComponents/CustomButton";
import { copyToClipboard } from "../../utils/clipboard.utils";

export const CoverLetter = () => {
  // const [prompt, setPrompt] = useState("");
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const handlePress = async () => {
    setLoading(true);
    const apiResponse = await getCoverLetterResponse(resume, jobDesc);
    setResponse(apiResponse);
    setLoading(false);
  };

  const canSubmit = resume && jobDesc;

  return (
    <View style={styles.container}>
      <CustomTextInput
        value={jobDesc}
        onChangeText={setJobDesc}
        placeholder="Paste Job Description"
        multiline
      />
      <CustomTextInput
        value={resume}
        onChangeText={setResume}
        placeholder="Paste Resume"
        multiline
      />
      <CustomButton
        title="Submit"
        onPress={handlePress}
        disabled={!canSubmit}
      />
      {response && (
        <View style={styles.copyContainer}>
          <TouchableOpacity
            style={styles.copyIcon}
            onPress={() => copyToClipboard(response)}
          >
            <Icon name="copy" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.responseTextContainer}>
        <TouchableOpacity onLongPress={() => copyToClipboard(response)}>
          <Text style={styles.responseText}>{response}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e", // Dark background for a techy feel
    padding: 20,
  },
  copyContainer: {
    position: "relative",
    padding: 10,
  },
  responseTextContainer: {
    flex: 1, // Takes the remaining space of the screen
    marginTop: 10,
  },
  responseHeader: {
    color: "#e0e0e0",
    fontSize: 24,
    fontWeight: "bold",
  },
  responseText: {
    color: "#e0e0e0", // Example style, adjust as needed
    fontSize: 18,
  },
  copyIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
});
