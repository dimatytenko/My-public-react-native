import { useEffect, useState, useCallback } from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ViewStyle } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { store } from "./redux/store";
import { Main } from "./components/Main";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "r-r": require("./assets/fonts/Roboto-Regular.ttf"),
          "r-b": require("./assets/fonts/Roboto-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
    <View onLayout={onLayout} style={styles.container}>
      <Provider store={store}>
        <Main />
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

interface IStyles {
  container: ViewStyle
  
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
  },
});
