import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import db from "../../../firebase/config";
import { PostsList } from "../../../components/PostsList";
import { globalStyle } from "../../../styles/style";

 interface TCurrentPost{
    photo: string,
    comment: string,
    countComments: number,
    place: string,
    location: ICoords | null,
    userId: string,
    nickName: string,
    countLike:string[],
    date: object,
    id?: string
  }

    interface ICoords{
      latitude: number,
      longitude: number
    }
export function DefaultPostsScreen() {
  const [posts, setPosts] = useState<TCurrentPost[] | []>([]);
  const { email, nickName } = useSelector(
    (state) => state.auth
  );

  console.log(posts)

  const getAllPost = async () => {
    await db
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

const styles = StyleSheet.create({
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
