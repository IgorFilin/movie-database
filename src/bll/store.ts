import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import {AppReducer} from "./app-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    app:AppReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

