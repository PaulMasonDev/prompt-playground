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
import { getPromptResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";
import Icon from "@expo/vector-icons/FontAwesome"; // Or any other icon set you prefer

export const ExpertAI = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");
  const [responseHeader, setResponseHeader] = useState("");

  const { setLoading } = useUserStore();

  const handlePress = async () => {
    setLoading(true);
    const apiResponse = await getPromptResponse(prompt, type);
    console.log({ apiResponse });
    setResponseHeader(prompt);
    setResponse(apiResponse);
    setPrompt("");
    setType("");
    setLoading(false);
  };

  const copyToClipboard = (header: string, text: string) => {
    Clipboard.setStringAsync(header + `\n` + text);
    alert("Text copied to clipboard");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="What do you want to know how to do?"
        placeholderTextColor="#e0e0e0" // Light color for the placeholder text
      />
      {/* <TextInput
        style={styles.textInput}
        value={type}
        onChangeText={setType}
        placeholder="Who is the audience? Leave blank for standard"
        placeholderTextColor="#e0e0e0"
      /> */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {response && (
        <View style={styles.copyContainer}>
          <TouchableOpacity
            style={styles.copyIcon}
            onPress={() => copyToClipboard(responseHeader, response)}
          >
            <Icon name="copy" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.responseTextContainer}>
        <TouchableOpacity
          onLongPress={() => copyToClipboard(responseHeader, response)}
        >
          {response && (
            <Text style={styles.responseHeader}>{responseHeader}</Text>
          )}
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
});
