import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  ViewStyle
} from "react-native";

import db from "../../../firebase/config";
import { PostsList } from "../../../components/PostsList";
import { globalStyle } from "../../../styles/style";
import { LogOut } from "../../../components/LogOut";
import {IRootReduser} from '../../../redux/store';

export function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, nickName } = useSelector(
    (state:IRootReduser) => state.auth
  );
  const { height, width } = useWindowDimensions();

  const horizontal = width < 600;

  useEffect(() => {
    getUserPosts();
  }, []);

  

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
  };
  return (
    <ImageBackground
      style={styles.image}
      source={require("../../../assets/images/main-BG.png")}
    >
      <View
        style={{
          ...styles.body,
          marginTop: horizontal ? 160 : 40,
        }}
      >
        <View style={styles.logOut}>
          <LogOut />
        </View>
        <View
          style={{
            ...styles.owner,
            marginTop: horizontal ? 90 : 30,
          }}
        >
          <Text style={{ ...globalStyle.mainTitle }}>
            {nickName}
          </Text>
        </View>
        <View
          style={{
            maxHeight: horizontal ? "80%" : "77%",
          }}
        >
          <PostsList posts={userPosts} />
        </View>
      </View>
    </ImageBackground>
  );
}

interface IStyles{
  image: ViewStyle,
  body: ViewStyle,
  owner: ViewStyle,
  logOut: ViewStyle,
}
const styles = StyleSheet.create<IStyles>({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  body: {
    backgroundColor: globalStyle.backgrounds.page,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexGrow: 1,
  },
  owner: {
    paddingHorizontal: 16,
    marginBottom: 32,
    alignItems: "center",
  },
  logOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
