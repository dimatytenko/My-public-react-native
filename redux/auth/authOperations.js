import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  authLoginError,
} = authSlice.actions;

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      await db
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: nickName,
      });

      const { displayName, uid } = await db.auth()
        .currentUser;

      dispatch(
        updateUserProfile({
          nickName: displayName,
          userId: uid,
          email: email,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      dispatch(authLoginError());
    }
  };

export const authSignOutUser =
  () => async (dispatch, getState) => {
    await db.auth().signOut();
    dispatch(authSignOut());
  };

export const authStateChangeUser =
  () => async (dispatch, getState) => {
    await db.auth().onAuthStateChanged((user) => {
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
