import {
  ADD_AUTH_TOKEN,
  DELETE_AUTH_TOKEN,
  ADD_USER_PROFILE_INFO,
  ADD_MENU_INFO,
  UPDATE_MENU_LOADING_STATE,
  SHRINK_SIDEBAR,
} from "../store/actionTypes";
import { UserProfileProps } from "./VendorProps";
import { UserAuthProps } from "./AuthProps";
import { MenuDataProps } from "./MenuProps";

export interface AuthTokenProps {
  type: typeof ADD_AUTH_TOKEN | typeof DELETE_AUTH_TOKEN;
  payload?: UserAuthProps;
}

export interface UserProfileActionProps {
  type: typeof ADD_USER_PROFILE_INFO;
  payload: UserProfileProps;
}

export interface MenuActionProps {
  type: typeof ADD_MENU_INFO | typeof UPDATE_MENU_LOADING_STATE;
  payload: MenuDataProps | boolean;
}

export interface SidebarProps {
  type: typeof SHRINK_SIDEBAR;
  payload: boolean;
}
