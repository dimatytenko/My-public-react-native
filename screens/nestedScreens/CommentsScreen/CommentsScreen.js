import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import db from "../../../firebase/config";
import { globalStyle } from "../../../styles/style";
import { ImagePost } from "../../../components/ImagePost";

export function CommentsScreen() {
  const route = useRoute();
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const { nickName } = useSelector((state) => state.auth);
  const { postId, photo } = route.params;

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        comment,
        nickName,
        date: new Date(),
      });

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        countComments: (allComments.length += 1),
      });

    setComment("");
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
  };

  return (
    <View style={styles.container}>
      <ImagePost photo={photo} />
      <SafeAreaView style={styles.commentsContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.commentNick}>
                {item.nickName}
              </Text>
              <View style={styles.commentBox}>
                <Text style={styles.commentText}>
                  {item.comment}
                </Text>
                {/* <Text>{item.date.toString()}</Text> */}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.boxInput}>
        <TextInput
          style={{
            ...styles.input,
            ...globalStyle.mainText,
          }}
          onChangeText={setComment}
          value={comment}
          placeholder="Коментувати..."
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.arrowUpButton}
          onPress={createPost}
        >
          <AntDesign
            name="arrowup"
            size={32}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: "space-between",
    backgroundColor: globalStyle.backgrounds.page,
  },
  boxImage: {
    marginBottom: 8,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
  commentsContainer: {
    flex: 1,
    marginBottom: 32,
  },
  comment: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  commentNick: {
    marginRight: 16,
  },
  commentBox: {
    flexGrow: 1,
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: globalStyle.backgrounds.comment,
  },
  commentText: {},
  boxInput: {
    position: "relative",
    paddingHorizontal: 16,
  },
  input: {
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 68,
    backgroundColor: globalStyle.backgrounds.input,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: globalStyle.colors.borderInput,
  },
  arrowUpButton: {
    position: "absolute",
    top: 5,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: globalStyle.backgrounds.button,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
