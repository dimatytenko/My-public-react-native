import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { globalStyle } from "../../../styles/style";
import { CustomButton } from "../../../components/CustomButton";
import db from "../../../firebase/config";

export function CreatePostsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [place, setPlace] = useState("");
  const { userId, nickName } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Permission to access location was denied"
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, [cameraRef]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPrevPhoto(uri);
    }
  };

  const downloadPhoto = async (uri) => {
    await MediaLibrary.createAssetAsync(uri);

    let location = await Location.getCurrentPositionAsync(
      {}
    );
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(coords);
    setPhoto(uri);
    setPrevPhoto(null);
  };

  const deletePhoto = async () => {
    setPrevPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db
      .storage()
      .ref(`postImage/${uniquePostId}`)
      .put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    await db.firestore().collection("posts").add({
      photo,
      comment,
      countComments: 0,
      place,
      location,
      userId,
      nickName,
      isLike: false,
      countLike: 0,
      date: new Date(),
    });
  };

  const sendPost = () => {
    if (!photo) {
      return;
    }
    uploadPostToServer();
    navigation.navigate("DefaultScreen", {
      photo,
      location,
      comment,
      place,
    });
    setPhoto(null);
    setComment("");
    setPlace("");
  };

  return (
    <View
      style={{
        ...globalStyle.screenContainer,
        ...styles.container,
      }}
    >
      <View style={styles.cameraWrap}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
              activeOpacity={0.5}
              style={styles.flipCamera}
            >
              <MaterialIcons
                name="flip-camera-ios"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePhoto}
              activeOpacity={0.5}
              style={styles.snapContainer}
            >
              <Entypo
                name="camera"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          </Camera>
        )}
      </View>

      {prevPhoto && (
        <View style={styles.takePhotoContainer}>
          <Image
            style={styles.image}
            source={{ uri: prevPhoto }}
          ></Image>
          <View style={styles.boxPermissions}>
            <TouchableOpacity
              onPress={() => downloadPhoto(prevPhoto)}
              activeOpacity={0.5}
            >
              <Text
                style={{
                  ...globalStyle.placeholder,
                  ...styles.downloadButton,
                }}
              >
                Завантажити фото
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deletePhoto}
              activeOpacity={0.5}
            >
              <Text
                style={{
                  ...globalStyle.placeholder,
                  ...styles.downloadButton,
                }}
              >
                Видалити фото
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.commentInputView}>
        <TextInput
          style={{
            ...styles.input,
            ...globalStyle.mainText,
          }}
          onChangeText={setComment}
          value={comment}
          placeholder="Назва..."
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
        />
      </View>
      <View style={styles.placeInputView}>
        <TextInput
          style={{
            ...styles.input,
            ...globalStyle.mainText,
            paddingLeft: 28,
          }}
          onChangeText={setPlace}
          value={place}
          placeholder="Місцевість..."
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
        />
        <View style={styles.iconLocation}>
          <Ionicons
            name="ios-location-outline"
            size={24}
            color={globalStyle.colors.fontSecondary}
          />
        </View>
      </View>
      <CustomButton
        onPress={sendPost}
        text={"Публікувати"}
      ></CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraWrap: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 32,
  },
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },

  flipCamera: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 16,
  },
  image: {
    height: 240,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxPermissions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  downloadButton: {
    marginBottom: 32,
  },
  commentInputView: {
    marginBottom: 16,
  },
  placeInputView: {
    marginBottom: 32,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: globalStyle.colors.borderInput,
  },
  iconLocation: {
    position: "absolute",
    top: 15,
  },
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
