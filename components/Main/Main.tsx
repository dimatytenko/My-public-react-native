import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../../router";
import { authStateChangeUser } from "../../redux/auth/authOperations";
import {IRootReduser} from '../../redux/store';

export function Main() {
  const dispatch = useDispatch();
  const { stateChange } = useSelector(
    (state:IRootReduser) => state.auth
  );

  const routing = useRoute(stateChange);

  useEffect(() => {
    (authStateChangeUser()(dispatch));
  }, []);

  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
