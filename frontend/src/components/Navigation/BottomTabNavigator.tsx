// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Auth from "../Auth/Auth";
import { ExpertAI } from "../Prompting/ExpertAI";
import Icon from "@expo/vector-icons/FontAwesome";
import { bottomTabStyles } from "./bottomTabStyles";
import { EmailResponder } from "../Prompting/EmailResponder";
import { CareerCraftAI } from "../Prompting/CareerCraftAI";

const Tab = createBottomTabNavigator();

enum AIRoute {
  Auth = "Auth",
  ExpertAI = "ExpertAI",
  CareerCraftAI = "CareerCraftAI",
  EmailResponder = "Email Responder",
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={AIRoute.CareerCraftAI}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === AIRoute.ExpertAI) {
            iconName = "flask";
          } else if (route.name === AIRoute.CareerCraftAI) {
            iconName = "file-text";
          } else if (route.name === AIRoute.EmailResponder) {
            iconName = "reply";
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
        name={AIRoute.ExpertAI}
        component={ExpertAI}
        options={{ tabBarAccessibilityLabel: AIRoute.ExpertAI }}
      />
      <Tab.Screen
        name={AIRoute.CareerCraftAI}
        component={CareerCraftAI}
        options={{ tabBarAccessibilityLabel: AIRoute.CareerCraftAI }}
      />
      <Tab.Screen
        name={AIRoute.EmailResponder}
        component={EmailResponder}
        options={{ tabBarAccessibilityLabel: AIRoute.EmailResponder }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
