import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

import db from "../../../firebase/config";
import { PostsList } from "../../../components/PostsList";
import { globalStyle } from "../../../styles/style";
import { IRootReduser } from '../../../redux/store';
import {IPost} from '../../../interfaces';

export function DefaultPostsScreen() {
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const { email, nickName } = useSelector(
    (state:IRootReduser) => state.auth
  );

  const getAllPost = () => {
    db
      .firestore()
      .collection("posts")
      .onSnapshot((data) => {
        const posts = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .sort(
            (a, b) => b.date.seconds - a.date.seconds
        );
        console.log(posts);
        setPosts(posts);
      });
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

interface IProps{
  container: ViewStyle,
  owner: ViewStyle,
  posts: ViewStyle,
}

const styles = StyleSheet.create<IProps>({
  container: {
    backgroundColor: globalStyle.backgrounds.page,
  },
  owner: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  posts: {
    maxHeight: "92%",
  },
});
