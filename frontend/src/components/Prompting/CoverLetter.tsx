import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  getCoverLetterResponse,
  getPromptResponse,
} from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import Icon from "@expo/vector-icons/FontAwesome"; // Or any other icon set you prefer

export const CoverLetter = () => {
  // const [prompt, setPrompt] = useState("");
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const handlePress = async () => {
    setLoading(true);
    const apiResponse = await getCoverLetterResponse(resume, jobDesc);
    // setResponseHeader(prompt);
    setResponse(apiResponse);
    // setPrompt("");
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    alert("Text copied to clipboard");
  };

  const canSubmit = resume && jobDesc;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={jobDesc}
        onChangeText={setJobDesc}
        placeholder="Paste Job Description"
        placeholderTextColor="#e0e0e0" // Light color for the placeholder text
        multiline
      />
      <TextInput
        style={styles.textInput}
        value={resume}
        onChangeText={setResume}
        placeholder="Paste Resume"
        placeholderTextColor="#e0e0e0" // Light color for the placeholder text
        multiline
      />
      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.disabledButton]}
        onPress={handlePress}
        disabled={!canSubmit}
      >
        <Text
          style={[styles.buttonText, !canSubmit && styles.disabledButtonText]}
        >
          Submit
        </Text>
      </TouchableOpacity>
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
  textInput: {
    backgroundColor: "#16213e", // Slightly lighter shade for input fields
    color: "#e0e0e0", // Light text for readability
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0f3460", // Subtle border color
  },
  button: {
    backgroundColor: "#0f3460", // Matching the theme's accent color
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#e0e0e0", // Light text on the button for contrast
    fontSize: 16,
    fontWeight: "bold",
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
    // Additional styling if needed
  },
  disabledButton: {
    backgroundColor: "#3a3a58", // A dimmer color for disabled state
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    opacity: 0.5, // Lower opacity to visually indicate the button is disabled
  },
  disabledButtonText: {
    color: "#b0b0b0", // A lighter color indicating the button is not active
    fontSize: 16,
    fontWeight: "bold",
  },
});
