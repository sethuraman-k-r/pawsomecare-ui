import { SHRINK_SIDEBAR } from "../actionTypes";
import { SidebarProps } from "../../props/ActionProps";

const initialState: boolean = true

const doShrinkSidebar = (state = initialState, action: SidebarProps): boolean => {
    switch (action.type) {
        case SHRINK_SIDEBAR: {
            return action.payload;
        }
        default: {
            return state
        }
    }
}

export default doShrinkSidebar;