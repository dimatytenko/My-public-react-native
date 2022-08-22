import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "./screens/auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen/RegistrationScreen";
import { Home } from "./screens/MainScreen/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
        >
          {() => <RegistrationScreen />}
        </AuthStack.Screen>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
        >
          {() => <LoginScreen />}
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
