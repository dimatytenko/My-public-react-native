import { useDispatch } from "react-redux";
import {
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { globalStyle } from "../../styles/style";
import { authSignOutUser } from "../../redux/auth/authOperations";

export function LogOut() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={()=> (authSignOutUser()(dispatch))}
    >
      <Ionicons
        name="log-out-outline"
        size={44}
        color={globalStyle.colors.fontSecondary}
      />
    </TouchableOpacity>
  );
}
