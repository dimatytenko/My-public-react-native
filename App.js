import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { globalStyle } from "./styles/style";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] =
    useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

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

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      console.log(width);
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
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
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View onLayout={onLayout} style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/main-BG.png")}
        >
          {/* <RegistrationScreen
            dimensions={dimensions}
            isShowKeyboard={isShowKeyboard}
            setIsShowKeyboard={setIsShowKeyboard}
          /> */}
          <LoginScreen
            dimensions={dimensions}
            isShowKeyboard={isShowKeyboard}
            setIsShowKeyboard={setIsShowKeyboard}
          />
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyle.backgrounds.page,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
