import {api, filmType} from "../api/app-api";
import {Dispatch} from "redux";

type allActionsType = any

type initialStateType = typeof initialState

const initialState = {
    films: []
}

export const AppReducer = (state: initialStateType = initialState, action: allActionsType) => {
    switch (action) {
        case 'XXX': {
            return {...state}
        }
        default:
            return state
    }
}

const setSearchFilms = (films:Array<filmType>) => {
    return {type:'APP/SET-FILMS',films}
}

const getFilmsTC = (titleSearchFilm:string) => async (dispatch:Dispatch) => {
    const result = await api.getMovie(titleSearchFilm)
      dispatch(setSearchFilms(result.data.Search))
}