import { StyleSheet } from "react-native";

export const bottomTabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#16213e", // A slightly lighter shade similar to your textInput
    borderTopColor: "#0f3460", // Color for the top border of the tab bar
    borderTopWidth: 1,
    padding: 10,
  },
  tabItem: {
    padding: 5, // Padding for each tab item
  },
  icon: {
    color: "#e0e0e0", // Light color for the icons, similar to your buttonText
    fontSize: 20, // Adjust size as needed
  },
  label: {
    color: "#e0e0e0", // Light color for the label text
    fontSize: 12, // Adjust label size as needed
    fontWeight: "bold",
  },
  activeTabItem: {
    backgroundColor: "#0f3460", // Highlight color for active tab
  },
  activeLabel: {
    color: "#e0e0e0", // Color for the label text when the tab is active
  },
  activeIcon: {
    color: "#e0e0e0", // Color for the icon when the tab is active
  },
});
