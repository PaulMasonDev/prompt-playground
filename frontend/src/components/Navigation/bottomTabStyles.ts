import { StyleSheet } from "react-native";
import { colors } from "../UIComponents/commonStyles";

export const bottomTabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.secondary, // A slightly lighter shade similar to your textInput
    borderTopColor: colors.accent, // Color for the top border of the tab bar
    borderTopWidth: 1,
    padding: 10,
  },
  tabItem: {
    padding: 5, // Padding for each tab item
  },
  icon: {
    color: colors.text, // Light color for the icons, similar to your buttonText
    fontSize: 20, // Adjust size as needed
  },
  label: {
    color: colors.text, // Light color for the label text
    fontSize: 12, // Adjust label size as needed
    fontWeight: "bold",
  },
  activeTabItem: {
    backgroundColor: colors.accent, // Highlight color for active tab
  },
  activeLabel: {
    color: colors.text, // Color for the label text when the tab is active
  },
  activeIcon: {
    color: colors.text, // Color for the icon when the tab is active
  },
});
