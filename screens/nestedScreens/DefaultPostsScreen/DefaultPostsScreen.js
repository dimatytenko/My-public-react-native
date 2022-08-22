import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import db from "../../../firebase/config";
import { PostsList } from "../../../components/PostsList";
import { globalStyle } from "../../../styles/style";

export function DefaultPostsScreen() {
  const [posts, setPosts] = useState([]);
  const { email, nickName } = useSelector(
    (state) => state.auth
  );

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.owner}>
        <Text style={globalStyle.mainBoldText}>
          {nickName}
        </Text>
        <Text style={globalStyle.placeholder}>{email}</Text>
      </View>
      <View style={styles.posts}>
        <PostsList posts={posts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  owner: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  posts: {
    maxHeight: "92%",
  },
});
