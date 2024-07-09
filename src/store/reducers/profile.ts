import { ADD_USER_PROFILE_INFO } from "../actionTypes";
import { UserProfileActionProps } from "../../props/ActionProps";
import { UserProfileProps, VendorProfileProps } from "../../props/VendorProps";

const initialState: VendorProfileProps | null = null;

const storeProfile = (
  state = initialState,
  action: UserProfileActionProps
): UserProfileProps | null => {
  switch (action.type) {
    case ADD_USER_PROFILE_INFO: {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default storeProfile;
