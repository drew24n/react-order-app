import {combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({app: appReducer})

export const store = createStore(rootReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))