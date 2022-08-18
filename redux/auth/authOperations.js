import db from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  () => async (dispatch, getSatte) => {};

export const authSignOutUser =
  () => async (dispatch, getSatte) => {};
