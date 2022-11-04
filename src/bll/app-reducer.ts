import {api, filmType, OpenDescriptionsFilmType} from "../api/app-api";
import {Dispatch} from "redux";

export type allActionsTypeAppReducer = getFilmsACtype | setSearchOneFilmACtype

type initialStateType = {
    films: Array<filmType> | []
    film: OpenDescriptionsFilmType | null

}
type getFilmsACtype = ReturnType<typeof setSearchFilms>
type setSearchOneFilmACtype = ReturnType<typeof setSearchOneFilm>

const initialState = {
    films: [],
    film: null
}

export const AppReducer = (state: initialStateType = initialState, action: allActionsTypeAppReducer):initialStateType => {
    switch (action.type) {
        case "APP/SET-FILMS": {
            return {...state, films: action.films}
        }
        case "APP/SET-ONE-FILM": {
            return {...state, film: action.film}
        }
        default:
            return state
    }
}

const setSearchFilms = (films: Array<filmType>) => {
    return {type: 'APP/SET-FILMS', films} as const
}
const setSearchOneFilm = (id: string, film: OpenDescriptionsFilmType) => {
    return {type: 'APP/SET-ONE-FILM', id, film} as const
}

export const getFilmsTC = (titleSearchFilm: string) => async (dispatch: Dispatch) => {
    const result = await api.getMovies(titleSearchFilm)
    dispatch(setSearchFilms(result.data.Search))
}

export const getOneFilmTC = (id: string, title: string) => async (dispatch: Dispatch) => {
    const result = await api.getFilm(title)
    dispatch(setSearchOneFilm(id, result.data))
}