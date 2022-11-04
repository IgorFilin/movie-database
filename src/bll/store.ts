import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import {allActionsTypeAppReducer, AppReducer} from "./app-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    app:AppReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppStoreType,unknown,DomainActionsCreatorsType>

type DomainActionsCreatorsType = allActionsTypeAppReducer

// @ts-ignore
window.store = store

