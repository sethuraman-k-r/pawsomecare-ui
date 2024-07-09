import { combineReducers } from "redux";
import authReducer from './auth';
import profileReducer from './profile'
import menuReducer from './menu'
import sidebarReducer from './sidebar'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    menu: menuReducer,
    sidebar: sidebarReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;