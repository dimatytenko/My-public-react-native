import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";

import { DefaultPostsScreen } from "../../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen/CommentsScreen";
import { MapScreen } from "../../nestedScreens/MapScreen/MapScreen";
// import { globalStyle } from "../../../styles/style";
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
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerTitleAlign: "center",
        }}
      />
    </NestedScreen.Navigator>
  );
}
