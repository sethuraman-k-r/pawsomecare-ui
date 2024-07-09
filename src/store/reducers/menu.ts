import { ADD_MENU_INFO, UPDATE_MENU_LOADING_STATE } from "../actionTypes";
import { MenuActionProps } from "../../props/ActionProps";
import { MenuDataProps } from "../../props/MenuProps";

type MenuState = {
    menuData: MenuDataProps
    isDataLoaded: boolean
};

const initialState: MenuState = {
    menuData: {},
    isDataLoaded: false
};

const menuReducer = (state = initialState, action: MenuActionProps): MenuState => {
    switch (action.type) {
        case ADD_MENU_INFO: {
            return {
                ...state,
                isDataLoaded: true,
                menuData: { ...(action.payload) as MenuDataProps }
            }
        }
        case UPDATE_MENU_LOADING_STATE: {
            return {
                ...state,
                isDataLoaded: (action.payload) as boolean
            }
        }
        default: {
            return { ...state };
        }
    }
}

export default menuReducer;
