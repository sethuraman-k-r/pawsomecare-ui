import { ADD_AUTH_TOKEN, DELETE_AUTH_TOKEN } from "../actionTypes";
import { AuthTokenProps } from "../../props/ActionProps";
import { UserAuthProps } from "../../props/AuthProps";

const initialState: UserAuthProps = {
  accessToken: "",
  email: "",
  username: "",
  role: "",
};

const doAuth = (
  state = initialState,
  action: AuthTokenProps
): UserAuthProps => {
  switch (action.type) {
    case ADD_AUTH_TOKEN: {
      const userAuthInfo = action.payload;
      return {
        accessToken: userAuthInfo?.accessToken || "",
        email: userAuthInfo?.email || "",
        username: userAuthInfo?.username || "",
        role: userAuthInfo?.role || "",
      };
    }
    case DELETE_AUTH_TOKEN: {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default doAuth;
