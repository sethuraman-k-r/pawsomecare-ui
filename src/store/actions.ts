import {
  ADD_AUTH_TOKEN,
  DELETE_AUTH_TOKEN,
  ADD_USER_PROFILE_INFO,
  ADD_MENU_INFO,
  UPDATE_MENU_LOADING_STATE,
  SHRINK_SIDEBAR,
} from "./actionTypes";
import {
  AuthTokenProps,
  UserProfileActionProps,
  MenuActionProps,
  SidebarProps,
} from "../props/ActionProps";
import { UserProfileProps } from "../props/VendorProps";
import { MenuDataProps } from "../props/MenuProps";

export const addAuthToken = (
  token: string,
  email: string,
  name: string,
  role: string
): AuthTokenProps => ({
  type: ADD_AUTH_TOKEN,
  payload: {
    accessToken: token,
    username: name,
    email,
    role,
  },
});

export const deleteAuthToken = (): AuthTokenProps => ({
  type: DELETE_AUTH_TOKEN,
});

export const addVendorProfileInfo = (
  profileInfo: UserProfileProps
): UserProfileActionProps => ({
  type: ADD_USER_PROFILE_INFO,
  payload: { ...profileInfo },
});

export const addMenuList = (menus: MenuDataProps): MenuActionProps => ({
  type: ADD_MENU_INFO,
  payload: menus,
});

export const updateMenuLoader = (isLoaded: boolean): MenuActionProps => ({
  type: UPDATE_MENU_LOADING_STATE,
  payload: isLoaded,
});

export const toggleSidebar = (toggle: boolean): SidebarProps => ({
  type: SHRINK_SIDEBAR,
  payload: toggle,
});
