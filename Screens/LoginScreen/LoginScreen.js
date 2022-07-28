import { useState } from "react";
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
} from "react-native";

import { Button } from "../../components/Button";
import { globalStyle, auth } from "../../styles/style";
import { chengePaddingBottom } from "../../functions";

const initialState = {
  email: "",
  password: "",
};
export function LoginScreen({
  dimensions,
  isShowKeyboard,
  setIsShowKeyboard,
}) {
  const [state, setState] = useState(initialState);
  const [isSecurity, setIsSecurity] = useState(true);

  function onSubmit() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  }

  return (
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

        <Button
          style={{ marginBottom: 16 }}
          text={"Зареєструватися"}
          onPress={onSubmit}
        />
      </KeyboardAvoidingView>

      <Text style={{ marginTop: 16, textAlign: "center" }}>
        Немає акаунта? Зареєструватися
      </Text>
    </View>
  );
}

LoginScreen.propTypes = {};
