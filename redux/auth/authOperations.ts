import db from "../../firebase/config";
import { authSlice } from "./authReducer";

import {IUser} from '../../interfaces';

const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  authLoginError,
} = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickName }:IUser) =>
  async (dispatch: (arg0: { payload: { userId: string; nickName: string | null; email: string | null; }; type: string; }) => void) => {
    try {
      await db
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = db.auth().currentUser;
      if (user) {
          await user.updateProfile({
            displayName: nickName,
          });
        }
      
    const newUser = db.auth().currentUser;
      if (newUser) {
        dispatch(updateUserProfile({
          nickName: newUser.displayName,
          userId: newUser.uid,
          email: email,})
          );
        }
      
  } catch (error) {
      console.log("error", error);
    }
  };

export const authSignInUser =
  ({ email, password }:IUser) =>
  async (dispatch: (arg0: { payload: { errorLogin: boolean; }; type: string; }) => void) => {
    try {
      const user = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      dispatch(authLoginError({errorLogin:true}));
    }
  };

export const authSignOutUser = () => async (dispatch: (arg0: { payload: undefined; type: string; }) => void):Promise<void> => {
  await db.auth().signOut();
    dispatch(authSignOut());
  };

export const authStateChangeUser =
  () => async (dispatch: (arg0: { payload: { userId: string; nickName: string | null; email: string | null; } | { stateChange: boolean; }; type: string; }) => void) => {
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            nickName: user.displayName,
            userId: user.uid,
            email: user.email,
          })
        );
        dispatch(
          authStateChange({
            stateChange: true,
          })
        );
      }
    });
  };


