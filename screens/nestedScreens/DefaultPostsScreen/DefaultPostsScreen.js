import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import { globalStyle } from "../../../styles/style";

export function DefaultPostsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log(posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.boxImage}>
              <Image
                source={{ uri: item.photo }}
                style={styles.image}
              />
            </View>
            <Text style={{ ...globalStyle.mainBoldText }}>
              {item.comment}
            </Text>
            <View style={styles.bottomPost}>
              <TouchableOpacity
                style={styles.infoBottomPost}
                onPress={() => {
                  navigation.navigate("Comments", {
                    // location: item.location,
                  });
                }}
                activeOpacity={0.7}
              >
                <View style={styles.iconBottomPost}>
                  <EvilIcons
                    name="comment"
                    size={24}
                    color={globalStyle.colors.fontSecondary}
                  />
                </View>
                <Text>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infoBottomPost}
                onPress={() => {
                  navigation.navigate("Map", {
                    location: item.location,
                  });
                }}
                activeOpacity={0.7}
              >
                <View style={styles.iconBottomPost}>
                  <Ionicons
                    name="ios-location-outline"
                    size={24}
                    color={globalStyle.colors.fontSecondary}
                  />
                </View>
                <Text
                  style={{
                    ...globalStyle.mainText,
                    ...styles.location,
                  }}
                >
                  {item.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  post: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  boxImage: {
    marginBottom: 8,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
  place: {
    marginBottom: 8,
  },
  bottomPost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBottomPost: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconBottomPost: {
    marginRight: 3,
  },
  location: { textDecorationLine: "underline" },
});
