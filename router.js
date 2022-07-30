import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";

import { LoginScreen } from "./screens/auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen/RegistrationScreen";
import { Home } from "./screens/MainScreen/Home";
import { MapScreen } from "./screens/MainScreen/MapScreen";
import { CommentsScreen } from "./screens/MainScreen/CommentsScreen";
import { CreatePostsScreen } from "./screens/MainScreen/CreatePostsScreen";
import { PostsScreen } from "./screens/MainScreen/PostsScreen";
import { ProfileScreen } from "./screens/MainScreen/ProfileScreen";

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth, setIsloggedIn) => {
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
            <RegistrationScreen
              dimensions={dimensions}
              setIsloggedIn={setIsloggedIn}
            />
          )}
        </AuthStack.Screen>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
        >
          {() => (
            <LoginScreen
              dimensions={dimensions}
              setIsloggedIn={setIsloggedIn}
            />
          )}
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
        {() => (
          <Home>
            <MainTab.Navigator>
              <MainTab.Screen
                options={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  // title: "Публікації",

                  tabBarIcon: ({
                    focused,
                    size,
                    color,
                  }) => (
                    <MaterialIcons
                      name="post-add"
                      size={size}
                      color={color}
                    />
                  ),
                }}
                name="Posts"
                component={PostsScreen}
              />
              <MainTab.Screen
                options={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  // title: "Публікації",

                  tabBarIcon: ({
                    focused,
                    size,
                    color,
                  }) => (
                    <Feather
                      name="plus"
                      size={size}
                      color={color}
                    />
                  ),
                }}
                name="CreatePosts"
                component={CreatePostsScreen}
              />
              <MainTab.Screen
                options={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  // title: "Публікації",

                  tabBarIcon: ({
                    focused,
                    size,
                    color,
                  }) => (
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={size}
                      color={color}
                    />
                  ),
                }}
                name="Profile"
                component={ProfileScreen}
              />
            </MainTab.Navigator>
          </Home>
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
    // <MainTab.Navigator>
    //   <MainTab.Screen name="Home" component={Home} />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //     }}
    //     name="Map"
    //     component={MapScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //     }}
    //     name="Comments"
    //     component={CommentsScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //     }}
    //     name="CreatePosts"
    //     component={CreatePostsScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //     }}
    //     name="Posts"
    //     component={PostsScreen}
    //   />
    //   <MainTab.Screen
    //     options={{
    //       headerShown: false,
    //     }}
    //     name="Profile"
    //     component={ProfileScreen}
    //   />
    // </MainTab.Navigator>
  );
};
