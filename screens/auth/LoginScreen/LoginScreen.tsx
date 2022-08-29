import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Alert,
  Vibration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import validator from "validator";
import {StackNavigationProp} from '@react-navigation/stack';


import { CustomButton } from "../../../components/CustomButton";
import { globalStyle, auth } from "../../../styles/style";
import { authSignInUser } from "../../../redux/auth/authOperations";
import { IRootReduser } from '../../../redux/store';
import {AuthStackParamList} from '../../../interfaces';

const initialState = {
  email: "",
  password: "",
};

type authScreenProp = StackNavigationProp<AuthStackParamList, 'Register'>;


export function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] =
    useState(false);
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);
  const navigation = useNavigation<authScreenProp>();
  const dispatch = useDispatch();
  const { errorLogin } = useSelector((state:IRootReduser) => state.auth);
  const { height, width } = useWindowDimensions();

  const vertical = width < 600;

  function onSubmit() {
    if (!state.email || !state.password) {
      Vibration.vibrate();
      Alert.alert("Увага", "Заповніть всі поля");
      return;
    }
    if (!validator.isEmail(state.email.trim())) {
      Vibration.vibrate();
      Alert.alert(
        "Увага",
        "Некоректний пароль, використовуйте приклад name@bar.com"
      );
      return;
    }
    if (state.password.trim().length < 8) {
      Vibration.vibrate();
      Alert.alert(
        "Увага",
        "Пароль має бути мінімум 8 сивмолів"
      );
      return;
    } else {
      authSignInUser(state)(dispatch);

      if (errorLogin) {
        Vibration.vibrate();
        Alert.alert("Увага", "Такого користувача не існує");
        return;
      } else {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        setState(initialState);
      }
    }
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
            paddingBottom: vertical ? 92 : 16,
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
                maxLength={16}
                placeholderTextColor={
                  globalStyle.colors.fontSecondary
                }
                onFocus={() => setIsShowKeyboard(true)}
                secureTextEntry={isSecurity}
                icon={<Text></Text>}
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
            <View style={{ marginBottom: 16 }}>
              <CustomButton
              text={"Зареєструватися"}
              onPress={onSubmit}
              />
              </View>
          </KeyboardAvoidingView>

          <TouchableOpacity
            style={auth.link}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={auth.linkText}>
              Немає акаунта?{" "}
              <Text style={auth.textMod}>
                Зареєструватися
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
