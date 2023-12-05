import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { getUserInfo, handleRegistration } from "../../clientLibrary/Auth";
import useUserStore from "../../utils/store";
import { StyledButton } from "../UIComponents/FormElements/StyledButton";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, setUser, setLoading, logout } = useUserStore();

  const isAuthenticated = (user && !!user.username) || false;

  const handleRegisterSubmit = async () => {
    setLoading(true);
    await handleRegistration({ username, password });
    const userInfo = await getUserInfo();
    if (userInfo.username) setUser(userInfo);
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
        />
        <StyledButton title="Register" onPress={handleRegisterSubmit} />
      </View>
    );
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

export default Register;
