import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import db from "../../../firebase/config";
import { globalStyle } from "../../../styles/style";
import { ImagePost } from "../../../components/ImagePost";
import { toDateTime } from "../../../functions";

export function CommentsScreen() {
  const route = useRoute();
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const { nickName } = useSelector((state) => state.auth);
  const { postId, photo } = route.params;
  const flatListRef = useRef();
  const { height, width } = useWindowDimensions();

  const vertical = width < 600;

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    if (!comment) {
      return;
    }
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

    Keyboard.dismiss();
    setComment("");
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) => {
        const comments = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .sort((a, b) => a.date.seconds - b.date.seconds);
        setAllComments(comments);
      });
  };

  return (
    <View style={styles.container}>
      {vertical && (
        <View style={styles.boxImage}>
          <ImagePost photo={photo} />
        </View>
      )}
      <SafeAreaView style={styles.commentsContainer}>
        <FlatList
          ref={flatListRef}
          onLayout={() =>
            flatListRef.current.scrollToEnd({
              animated: true,
            })
          }
          data={allComments}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.comment,
                flexDirection:
                  index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              <Text
                style={{
                  ...styles.commentNick,
                  marginRight: index % 2 === 0 ? 16 : 0,
                  marginLeft: index % 2 !== 0 ? 16 : 0,
                }}
              >
                {item.nickName}
              </Text>
              <View
                style={{
                  ...styles.commentBox,
                  borderTopLeftRadius:
                    index % 2 === 0 ? 0 : 6,
                  borderTopRightRadius:
                    index % 2 !== 0 ? 0 : 6,
                }}
              >
                <Text
                  style={{
                    ...styles.commentText,
                    ...globalStyle.mainText,
                  }}
                >
                  {item.comment}
                </Text>
                <Text
                  style={{
                    ...globalStyle.placeholder,
                    textAlign:
                      index % 2 === 0 ? "right" : "left",
                  }}
                >
                  {toDateTime(item.date.seconds)}
                </Text>
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
  commentsContainer: {
    flex: 1,
    marginBottom: 32,
  },
  comment: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  commentNick: {},
  commentBox: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 16,
    borderRadius: 6,
    backgroundColor: globalStyle.backgrounds.comment,
  },
  commentText: {
    marginBottom: 8,
  },
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
