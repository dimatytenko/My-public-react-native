import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  // container: {},
  colors: {
    fontPrimary: "#212121",
    fontSecondary: "#BDBDBD",
    fontMod: "#1B4371",
    fontButton: "#ffffff",
    borderInput: "#E8E8E8",
  },
  backgrounds: {
    page: "#ffffff",
    button: "#FF6C00",
    input: "#F6F6F6",
  },
  mainText: {
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  mainTitle: {
    fontFamily: "r-b",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  placeholder: {
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});

export const input = StyleSheet.create({
  borderWidth: 1,
  borderColor: globalStyle.colors.borderInput,
  height: 50,
  borderRadius: 8,
  backgroundColor: globalStyle.backgrounds.input,
  padding: 16,
  fontFamily: "r-r",
  fontSize: 16,
  lineHeight: 19,
  color: globalStyle.colors.fontPrimary,
});
