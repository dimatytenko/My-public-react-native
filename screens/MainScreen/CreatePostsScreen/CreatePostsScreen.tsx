import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import {styles} from './stylesCreatePostScreen';
import { globalStyle } from "../../../styles/style";
import { CustomButton } from "../../../components/CustomButton";
import db from "../../../firebase/config";
import { ICoord, IPost } from '../../../interfaces';
import { IRootReduser } from '../../../redux/store';

export function CreatePostsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userId, nickName } = useSelector(
    (state:IRootReduser) => state.auth
  );
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [location, setLocation] = useState<ICoord | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [prevPhoto, setPrevPhoto] = useState<string | null>(null);
  const [photo, setPhoto] = useState('');
  const [comment, setComment] = useState("");
  const [place, setPlace] = useState("");

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

   const deletePhoto = async () => {
    setPrevPhoto(null);
  };

  const downloadPhoto = async (uri:string) => {
    await MediaLibrary.createAssetAsync(uri);

    let location = await Location.getCurrentPositionAsync(
      {}
    );

      const coords: ICoord = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(coords);
    setPhoto(uri);
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
    const photo: string = await uploadPhotoToServer();


    const currentPost: IPost = {
      photo,
      comment,
      countComments: 0,
      place,
      location,
      userId,
      nickName,
      countLike:[],
      date: new Date(),
      id: ''
    }    
    await db.firestore().collection("posts").add(currentPost);
  };

  const sendPost = () => {
    if (!photo) {
      return;
    }
    navigation.navigate("DefaultScreen");
    uploadPostToServer();
    setPhoto('');
    setComment("");
    setPlace("");
  };

  return (
    <ScrollView>
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
        <View style={styles.boxButton}>
          <CustomButton
            onPress={sendPost}
            text={"Публікувати"}
          ></CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}

