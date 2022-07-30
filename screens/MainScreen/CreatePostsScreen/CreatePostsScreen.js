import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { globalStyle } from "../../../styles/style";
import { CustomButton } from "../../../components/CustomButton";

export function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  console.log(hasPermission);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>"Немає доступу до камери</Text>;
  }

  return (
    <>
      <View style={styles.header}>
        <View
          style={{
            ...globalStyle.container,
          }}
        >
          <Text style={globalStyle.header}>
            Створити публікацію
          </Text>
        </View>
      </View>
      <View
        style={{
          ...globalStyle.container,
        }}
      >
        <View style={styles.cameraWrap}>
          <Camera
            style={styles.camera}
            type={type}
            ref={setCamera}
          >
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
              activeOpacity={0.7}
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
              activeOpacity={0.7}
              style={styles.snapContainer}
            >
              <Entypo
                name="camera"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={globalStyle.placeholder}>
          Завантажити фото
        </Text>
        <CustomButton text={"Опублікувати"}></CustomButton>
      </View>
    </>
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
  camera: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraWrap: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
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
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
