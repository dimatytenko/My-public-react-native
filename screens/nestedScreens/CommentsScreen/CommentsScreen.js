import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import db from "../../../firebase/config";
import { globalStyle } from "../../../styles/style";

export function CommentsScreen() {
  const route = useRoute();
  const [comment, setComment] = useState("");
  const { nickName } = useSelector((state) => state.auth);
  const { postId } = route.params;
  console.log(route.params.postId);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName });

    setComment("");
  };

  return (
    <View style={styles.container}>
      <View></View>
      <View></View>
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
