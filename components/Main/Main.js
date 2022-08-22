import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import { setDimensions } from "../../redux/tools/toolsReducer";

export function Main() {
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  const dispatch = useDispatch();
  const { stateChange } = useSelector(
    (state) => state.auth
  );

  const routing = useRoute(stateChange);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  useEffect(() => {
    dispatch(setDimensions(dimensions));
  }, [dimensions]);

  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
