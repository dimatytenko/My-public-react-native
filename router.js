import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";

import { LoginScreen } from "./screens/auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen/RegistrationScreen";
import { Home } from "./screens/MainScreen/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );

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

  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
        >
          {() => (
            <RegistrationScreen dimensions={dimensions} />
          )}
        </AuthStack.Screen>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
        >
          {() => <LoginScreen dimensions={dimensions} />}
        </AuthStack.Screen>
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
      >
        {() => <Home></Home>}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
