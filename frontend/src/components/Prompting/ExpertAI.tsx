import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StyledButton } from "../UIComponents/StyledButton";
import { getPromptResponse } from "../../clientLibrary/Prompting";
import useUserStore from "../../utils/store";

export const ExpertAI = () => {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("");
  const [response, setResponse] = useState("");

  const { setLoading } = useUserStore();

  const handlePress = async () => {
    setLoading(true);
    const apiResponse = await getPromptResponse(prompt, type);
    console.log({ apiResponse });
    setResponse(apiResponse);
    setPrompt("");
    setType("");
    setLoading(false);
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
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
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
  responseContainer: {
    flex: 1, // Takes the remaining space of the screen
    marginTop: 10,
  },
  responseText: {
    color: "#e0e0e0", // Example style, adjust as needed
    fontSize: 18,
  },
});
