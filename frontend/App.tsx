import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import BottomTabNavigator from "./src/components/Navigation/BottomTabNavigator";
import useUserStore from "./src/utils/store";
// import { getUserInfo } from "./src/clientLibrary/Auth";
import Loader from "./src/utils/Loader/Loader";
import { colors } from "./src/components/UIComponents/commonStyles";
import Footer from "./src/components/Navigation/Footer";

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
          <Footer />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
    maxWidth: 450,
  },
});

export default App;
