import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

import { Button } from "../../components/Button";
import { globalStyle } from "../../styles/style";
import { input } from "../../styles/style";

export function RegistrationScreen() {
  return (
    <View style={styles.page}>
      <Text
        style={{
          ...globalStyle.mainTitle,
          ...styles.title,
        }}
      >
        Реєстрація
      </Text>
      <View>
        <TextInput
          style={{ ...input, ...styles.input }}
          placeholder={"Логін"}
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
          maxLength={16}
        />
      </View>

      <View>
        <TextInput
          style={{ ...input, ...styles.input }}
          placeholder={"Адреса электронної пошти"}
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
          maxLength={16}
        />
      </View>

      <View>
        <TextInput
          style={{ ...input, marginBottom: 43 }}
          placeholder={"Пароль"}
          placeholderTextColor={
            globalStyle.colors.fontSecondary
          }
          maxLength={16}
        />
      </View>

      <Button
        style={{ marginBottom: 16 }}
        text={"Зареєструватися"}
      />
      <Text style={{ marginTop: 16, textAlign: "center" }}>
        Уже есть аккаунт? Войти
      </Text>
    </View>
  );
}

RegistrationScreen.propTypes = {};

const styles = StyleSheet.create({
  page: {
    height: 549,
    backgroundColor: globalStyle.backgrounds.page,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingBottom: 45,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 33,
  },
  input: {
    marginBottom: 16,
  },
});
