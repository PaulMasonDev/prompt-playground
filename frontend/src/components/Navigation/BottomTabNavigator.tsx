// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Auth from "../Auth/Auth";
import { ExpertAI } from "../Prompting/ExpertAI";
import { CoverLetter } from "../Prompting/CoverLetter";
import Icon from "@expo/vector-icons/FontAwesome";
import { bottomTabStyles } from "./bottomTabStyles";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ExpertAI"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "ExpertAI") {
            iconName = "flask";
          } else if (route.name === "Cover Letter") {
            iconName = "file-text";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: bottomTabStyles.tabBar,
        tabBarLabelStyle: bottomTabStyles.label,
        tabBarActiveTintColor: "#e0e0e0",
        tabBarInactiveTintColor: "gray",
      })}
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
