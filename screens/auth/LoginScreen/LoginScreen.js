import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomButton } from "../../../components/CustomButton";
import { globalStyle, auth } from "../../../styles/style";
import { chengePaddingBottom } from "../../../functions";
import { authSignInUser } from "../../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};
export function LoginScreen({ dimensions }) {
  const [isShowKeyboard, setIsShowKeyboard] =
    useState(false);
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function onSubmit() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authSignInUser(state));
    setState(initialState);
    // setIsloggedIn(true);
    // () => navigation.navigate("Home");
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        style={auth.image}
        source={require("../../../assets/images/main-BG.png")}
      >
        <View
          style={{
            ...auth.page,
            ...globalStyle.container,
            paddingTop: 32,
            paddingBottom: chengePaddingBottom(
              isShowKeyboard,
              dimensions
            ),
          }}
        >
          <View>
            <Text
              style={{
                ...globalStyle.mainTitle,
                ...auth.title,
              }}
            >
              Увійти
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={
              Platform.OS === "ios" ? "padding" : "height"
            }
          >
            <View style={auth.view}>
              <TextInput
                style={auth.input}
                placeholder={"Адреса электронної пошти"}
                placeholderTextColor={
                  globalStyle.colors.fontSecondary
                }
                maxLength={16}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
            </View>

            <View style={auth.viewPassword}>
              <TextInput
                style={auth.input}
                placeholder={"Пароль"}
                placeholderTextColor={
                  globalStyle.colors.fontSecondary
                }
                maxLength={16}
                onFocus={() => setIsShowKeyboard(true)}
                secureTextEntry={isSecurity}
                icon={<Text>Показати</Text>}
                iconPosition="right"
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                style={auth.iconPasswordBox}
                onPress={() => {
                  setIsSecurity((prevState) => !prevState);
                }}
              >
                <Text style={auth.iconPassword}>
                  {isSecurity ? "Показати" : "Сховати"}
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              style={{ marginBottom: 16 }}
              text={"Зареєструватися"}
              onPress={onSubmit}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={auth.link}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={auth.linkText}>
              Немає акаунта? Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

LoginScreen.propTypes = {};
