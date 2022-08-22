import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { globalStyle } from "../../styles/style";
import db from "../../firebase/config";
import { ImagePost } from "../../components/ImagePost";

export function PostsList({ posts }) {
  const navigation = useNavigation();

  const changeLike = async (postId) => {
    const post = posts.find((post) => post.id === postId);

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        countLike: post.isLike
          ? (post.countLike -= 1)
          : (post.countLike += 1),
      });

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        isLike: !post.isLike,
      });
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, indx) => indx.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <ImagePost photo={item.photo} />

          <Text style={{ ...globalStyle.mainBoldText }}>
            {item.comment}
          </Text>
          <View style={styles.bottomPost}>
            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => {
                navigation.navigate("Comments", {
                  postId: item.id,
                  photo: item.photo,
                });
              }}
              activeOpacity={0.7}
            >
              <View style={styles.iconBottomPost}>
                {(item.countComments && (
                  <FontAwesome
                    name="commenting"
                    size={24}
                    color={
                      globalStyle.colors.borderInputActive
                    }
                  />
                )) || (
                  <FontAwesome
                    name="commenting-o"
                    size={24}
                    color={globalStyle.colors.fontSecondary}
                  />
                )}
              </View>

              <Text
                style={{
                  ...globalStyle.mainText,
                }}
              >
                {item.countComments}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => changeLike(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconBottomPost}>
                {(item.isLike && (
                  <AntDesign
                    name="like1"
                    size={24}
                    color={
                      globalStyle.colors.borderInputActive
                    }
                  />
                )) || (
                  <AntDesign
                    name="like2"
                    size={24}
                    color={globalStyle.colors.fontSecondary}
                  />
                )}
              </View>

              <Text
                style={{
                  ...globalStyle.mainText,
                }}
              >
                {item.countLike}
              </Text>
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
  );
}

const styles = StyleSheet.create({
  post: {
    paddingHorizontal: 16,
    marginBottom: 32,
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
    marginRight: 6,
  },
  location: { textDecorationLine: "underline" },
});
