import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';

import { globalStyle } from "../../styles/style";
import db from "../../firebase/config";
import { ImagePost } from "../../components/ImagePost";
import { IPost, PostsStackParamList} from '../../interfaces';
import { IRootReduser } from '../../redux/store';
interface IProps{
  posts: IPost[]
}

type commentsScreenProp = StackNavigationProp<PostsStackParamList, 'Comments'>;
type mapScreenProp = StackNavigationProp<PostsStackParamList, 'Map'>;

export function PostsList({ posts, }: IProps) {
  const navigationComments = useNavigation<commentsScreenProp>();
  const navigationMap = useNavigation<mapScreenProp>();

  const { userId } = useSelector((state:IRootReduser) => state.auth);

  const changeLike = async (postId:string):Promise<void> => {
    const post = posts.find(
      (post) => post.id === postId
    );
    
    if (post && userId) {
      const isLike = post.countLike.some(el=>el === userId);
      let likeArray = post.countLike;

      if (!isLike) {
        likeArray = [...likeArray, userId];
      } else {
        likeArray = likeArray.filter((el) => el !== userId);
      }
    
      await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        countLike: likeArray,
      });
    }
  }
  
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
                navigationComments.navigate('Comments', {
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
                {(item.countLike.some(el=>el === userId) && (
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
                {item.countLike.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoBottomPost}
              onPress={() => {
                navigationMap.navigate("Map", {
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
interface IStyles{
  post:ViewStyle,
  place:TextStyle,
  bottomPost:ViewStyle,
  infoBottomPost:ViewStyle,
  iconBottomPost:ViewStyle,
  location:TextStyle,
}

const styles = StyleSheet.create<IStyles>({
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
