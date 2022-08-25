import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { globalStyle } from "../../styles/style";

export function CustomButton({ text, onPress }) {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.btnTitle}>{text}</Text>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 100,
    backgroundColor: globalStyle.backgrounds.button,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: globalStyle.colors.fontButton,
  },
});
