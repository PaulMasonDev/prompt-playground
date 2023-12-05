import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#16213e", // Match the color with the bottom tab
        },
        headerTintColor: "#e0e0e0", // Color of the header title and buttons
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerTitle: "Prompt Playground" }} // Customize title
      />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
