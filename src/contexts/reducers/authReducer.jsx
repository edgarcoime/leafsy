import * as actions from "./types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case actions.USER_REGISTER:
    case actions.USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case actions.USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        googleCred: null,
        mongoCred: null,
      };
    default:
      return state;
  }
};
