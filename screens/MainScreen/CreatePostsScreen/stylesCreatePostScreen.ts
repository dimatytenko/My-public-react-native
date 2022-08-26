import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle
} from "react-native";

import { globalStyle } from "../../../styles/style";

interface IStyles{
 container: ViewStyle,
  cameraWrap: ViewStyle,
  camera: ViewStyle,
  flipCamera: ViewStyle,
  takePhotoContainer:ViewStyle,
  image:ImageStyle,
  boxPermissions: ViewStyle,
  downloadButton: TextStyle,
  commentInputView:ViewStyle,
  placeInputView:ViewStyle,
  input:TextStyle,
  iconLocation: ViewStyle,
  snapContainer: ViewStyle,
  boxButton: ViewStyle,
}

export const styles = StyleSheet.create<IStyles>({
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
  boxButton: {
    marginBottom: 16,
  },
});
