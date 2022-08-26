
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle
} from "react-native";

import { globalStyle } from "../../styles/style";

interface IProps {
  text: string
  onPress(): void
}

export function CustomButton({ text, onPress }:IProps) {
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

interface IStyles {
  btn: ViewStyle,
  btnTitle: TextStyle
}

const styles = StyleSheet.create<IStyles>({
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
