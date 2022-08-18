import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

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
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
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
      console.log("error.code", error.code);
      console.log("error.message", error.message);
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
