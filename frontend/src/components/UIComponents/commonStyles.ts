import { StyleSheet } from "react-native";

export const colors = {
  primary: "#0f3460",
  secondary: "#16213e",
  tertiary: "#1a1a2e",
  accent: "#4D9BF5", // or any other bright, yet not overpowering, blue
  text: "#FFFFFF",
  textSecondary: "#e0e0e0",
  positiveFeedback: "#3a9a5f", // a muted green
  negativeFeedback: "#a93f3f", // a muted red
  warning: "#f1c40f",
  neutral: "#3a3a58",
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Dark background for a techy feel
    padding: 20,
  },
  textInput: {
    backgroundColor: colors.tertiary, // Slightly lighter shade for input fields
    color: colors.textSecondary, // Light text for readability
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.primary, // Subtle border color
  },
  button: {
    backgroundColor: colors.secondary, // Matching the theme's accent color
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 0,
  },
  buttonText: {
    color: colors.text, // Light text on the button for contrast
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
