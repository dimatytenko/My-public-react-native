import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DefaultPostsScreen } from "../../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../nestedScreens/MapScreen/MapScreen";
import { LogOut } from "../../../components/LogOut";

const NestedScreen = createNativeStackNavigator();

export function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => <LogOut />,
          headerTitleStyle: {
            fontFamily: "r-b",
            fontSize: 35,
            color: "#212121",
          },
        }}
        name="DefaultScreen"
      >
        {() => <DefaultPostsScreen />}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "r-b",
            fontSize: 35,
            color: "#212121",
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "r-b",
            fontSize: 35,
            color: "#212121",
          },
        }}
      />
    </NestedScreen.Navigator>
  );
}

