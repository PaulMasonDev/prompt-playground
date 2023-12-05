import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
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
