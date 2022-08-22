import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  screenContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  colors: {
    fontPrimary: "#212121",
    fontSecondary: "#BDBDBD",
    fontMod: "#1B4371",
    fontButton: "#ffffff",
    borderInput: "#E8E8E8",
    borderInputActive: "#FF6C00",
  },
  backgrounds: {
    page: "#ffffff",
    button: "#FF6C00",
    input: "#F6F6F6",
    comment: "#F6F6F6",
  },
  mainText: {
    fontFamily: "r-r",
    fontSize: 20,
    lineHeight: 25,
    color: "#212121",
  },
  mainBoldText: {
    fontFamily: "r-b",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  mainTitle: {
    fontFamily: "r-b",
    fontSize: 35,
    lineHeight: 40,
    color: "#212121",
  },
  placeholder: {
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  header: {
    fontFamily: "r-r",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
});

export const auth = StyleSheet.create({
  page: {
    backgroundColor: globalStyle.backgrounds.page,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 78,
  },
  input: {
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
  },
  view: {
    marginBottom: 16,
  },
  title: { textAlign: "center", marginBottom: 33 },
  viewPassword: { marginBottom: 43, position: "relative" },
  iconPasswordBox: {
    position: "absolute",
    top: 16,
    right: 16,
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
  iconPassword: {
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  link: {
    marginTop: 16,
    alignSelf: "center",
  },
  linkText: {
    fontFamily: "r-r",
    fontSize: 16,
    lineHeight: 19,
    color: globalStyle.colors.fontMod,
  },
});
