// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Auth from "../Auth/Auth";
import { ExpertAI } from "../Prompting/ExpertAI";
import { CoverLetter } from "../Prompting/CoverLetter";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ExpertAI"
      screenOptions={({ route }) => ({})}
    >
      {/* <Tab.Screen
        name="Auth"
        component={Auth}
        options={{ tabBarAccessibilityLabel: "Auth" }}
      /> */}
      <Tab.Screen
        name="ExpertAI"
        component={ExpertAI}
        options={{ tabBarAccessibilityLabel: "ExpertAI" }}
      />
      <Tab.Screen
        name="Cover Letter"
        component={CoverLetter}
        options={{ tabBarAccessibilityLabel: "CoverLetter" }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
