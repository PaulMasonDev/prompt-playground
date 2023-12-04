// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Auth from "../Auth/Auth";
import { ExpertAI } from "../Prompting/ExpertAI";

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
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
