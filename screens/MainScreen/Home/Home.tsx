import React from "react";
import { StyleSheet, View,ViewStyle } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import { CreatePostsScreen } from "../CreatePostsScreen";
import { PostsScreen } from "../PostsScreen";
import { ProfileScreen } from "../ProfileScreen";
import { globalStyle } from "../../../styles/style";

const MainTab = createBottomTabNavigator();

export function Home() {
  return (
    <View style={styles.container}>
      <MainTab.Navigator>
        <MainTab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...styles.buttonTab,
                  backgroundColor: focused
                    ? globalStyle.backgrounds.button
                    : "transparrent",
                }}
              >
                <AntDesign
                  name="appstore-o"
                  size={26}
                  color={
                    focused
                      ? globalStyle.colors.fontButton
                      : globalStyle.colors.fontPrimary
                  }
                />
              </View>
            ),
          }}
          name="Posts"
          component={PostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarShowLabel: false,
            title: "Створити публікацію",
            headerTitleAlign: "center",
            headerTitleStyle: {
              ...globalStyle.mainTitle,
            },

            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...styles.buttonTab,
                  backgroundColor: focused
                    ? globalStyle.backgrounds.button
                    : "transparrent",
                }}
              >
                <Feather
                  name="plus"
                  size={30}
                  color={
                    focused
                      ? globalStyle.colors.fontButton
                      : globalStyle.colors.fontPrimary
                  }
                />
              </View>
            ),
          }}
          name="CreatePosts"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarShowLabel: false,
            headerShown: false,

            tabBarIcon: ({ focused, size, color }) => (
              <View
                style={{
                  ...styles.buttonTab,
                  backgroundColor: focused
                    ? globalStyle.backgrounds.button
                    : "transparrent",
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={26}
                  color={
                    focused
                      ? globalStyle.colors.fontButton
                      : globalStyle.colors.fontPrimary
                  }
                />
              </View>
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    </View>
  );
}

interface IStyle{
  container: ViewStyle,
  buttonTab: ViewStyle,
}

const styles = StyleSheet.create<IStyle>({
  container: {
    flex: 1,
  },
  buttonTab: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});
