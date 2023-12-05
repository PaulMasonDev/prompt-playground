import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import BottomTabNavigator from "./src/components/Navigation/BottomTabNavigator";
import useUserStore from "./src/utils/store";
// import { getUserInfo } from "./src/clientLibrary/Auth";
import Loader from "./src/utils/Loader/Loader";

function App() {
  const { setUser, isLoading, loadingMessage } = useUserStore();
  // useEffect(() => {
  //   const getUser = async () => {
  //     const data = await getUserInfo();
  //     setUser(data);
  //   };
  //   getUser();
  // }, []);

  return (
    <>
      <Loader isLoading={isLoading} message={loadingMessage} />
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <BottomTabNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    maxWidth: 450,
  },
});

export default App;
