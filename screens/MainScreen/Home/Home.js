import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
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
            tabBarShowLabel: false,
            title: "Створити публікацію",
            headerTitleAlign: "center",
            headerTitleStyle: {
              ...globalStyle.mainTitle,
            },

            tabBarIcon: ({ focused, size, color }) => (
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
            tabBarShowLabel: false,
            headerShown: false,

            tabBarIcon: ({ focused, size, color }) => (
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
