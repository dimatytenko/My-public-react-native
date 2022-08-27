import db from "../../firebase/config";
import { authSlice } from "./authReducer";

interface IUser{
  email:string, password: string, nickName?: string
}
type TDispatch = (dispatch: object) => void
type TGetState = (getState: object)=> void



type TFunc = (user:IUser)=> (dispatch:TDispatch, getState: TGetState)=>void

const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  authLoginError,
} = authSlice.actions;

export const authSignUpUser:TFunc =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      await db
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;
      if (user) {
          await user.updateProfile({
            displayName: nickName,
          });
        }
      
    const newUser = await db.auth().currentUser;
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

export const authSignInUser :TFunc =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      dispatch(authLoginError(null));
    }
  };

export const authSignOutUser:TFunc =
  () => async (dispatch, getState) => {
    await db.auth().signOut();
    dispatch(authSignOut());
  };

export const authStateChangeUser:TFunc =
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
