import React from "react";
import { View, StyleSheet } from "react-native";
import { handleLogout } from "../../clientLibrary/Auth";
import useUserStore from "../../utils/store";
import { StyledButton } from "../UIComponents/FormElements/StyledButton";

const Logout: React.FC = () => {
  const { setUser, setLoading, logout } = useUserStore();

  const handleLogoutSubmit = () => {
    setLoading(true);
    handleLogout();
    setUser(null);
    logout();
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StyledButton title="Log Out" onPress={handleLogoutSubmit} />
    </View>
  );
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

export default Logout;
