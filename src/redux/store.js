import {combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {orderReducer} from "./orderReducer";

const rootReducer = combineReducers({order: orderReducer})

export const store = createStore(rootReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))