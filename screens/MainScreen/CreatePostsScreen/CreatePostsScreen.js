import { useEffect, useState } from "react";
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

export function CreatePostsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [place, setPlace] = useState("");

  console.log(cameraRef);
  console.log(isFocused);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Permission to access location was denied"
        );
      }

      let location = await Location.getCurrentPositionAsync(
        {}
      );
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
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
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
  };
  const downloadPhoto = async () => {
    console.log(MediaLibrary);
  };

  const sendPost = () => {
    if (!photo) {
      return;
    }
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
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              style={styles.image}
              source={{ uri: photo }}
            ></Image>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={downloadPhoto}
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
  header: {
    paddingTop: 55,
    paddingBottom: 11,
    marginBottom: 45,
    borderBottomWidth: 2,
    borderBottomColor: globalStyle.colors.borderInput,
    alignItems: "center",
  },
  cameraWrap: {
    position: "relative",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    position: "relative",
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
    top: 0,
    left: 0,
    zIndex: 10,
  },
  image: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
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
