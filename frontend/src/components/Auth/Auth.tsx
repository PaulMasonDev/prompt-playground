import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import useUserStore from "../../utils/store";
import Logout from "./Logout";
import { Login } from "./Login";
import Register from "./Register";
import { StyledButton } from "../UIComponents/FormElements/StyledButton";

const AuthScreen: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useUserStore();

  const isAuthenticated = (user && !!user.username) || false;

  if (!isAuthenticated) {
    if (!showRegister) {
      return (
        <View style={styles.container}>
          <Login />
          <StyledButton
            title="Need to Register?"
            onPress={() => setShowRegister(true)}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Register />
          <StyledButton
            title="Need to Login?"
            onPress={() => setShowRegister(false)}
          />
        </View>
      );
    }
  } else {
    return <Logout />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AuthScreen;
