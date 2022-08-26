import { useDispatch } from "react-redux";
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
import { Ionicons } from "@expo/vector-icons";

import { globalStyle } from "../../styles/style";
import { authSignOutUser } from "../../redux/auth/authOperations";

export function LogOut() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => dispatch(authSignOutUser())}
    >
      <Ionicons
        name="log-out-outline"
        size={44}
        color={globalStyle.colors.fontSecondary}
      />
    </TouchableOpacity>
  );
}
