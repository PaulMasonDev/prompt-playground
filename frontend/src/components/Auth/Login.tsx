import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { handleLogin, getUserInfo } from "../../clientLibrary/Auth";
import useUserStore from "../../utils/store";
import { StyledButton } from "../UIComponents/StyledButton";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setLoading } = useUserStore();

  const isAuthenticated = (user && !!user.username) || false;

  const handleLoginSubmit = async () => {
    setLoading(true);
    const data = await handleLogin({ username, password });
    if (data && data.access_token) {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    }
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
        <StyledButton title="Log In" onPress={handleLoginSubmit} />
      </View>
    );
  }

  return null;
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
