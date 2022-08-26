import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";

export function Main() {
  const dispatch = useDispatch();
  const { stateChange } = useSelector(
    (state) => state.auth
  );

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
