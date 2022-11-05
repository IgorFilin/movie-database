import {api, filmType, OpenDescriptionsFilmType} from "../api/app-api";
import {Dispatch} from "redux";

export type allActionsTypeAppReducer = getFilmsACtype | setSearchOneFilmACtype | setTotalResultPagesFilmACtype | setCurrentPageACtype | setTitleSearchFilmsACtype | setIsLoadingFilmsACtype

type initialStateType = {
    films: Array<filmType> | []
    film: OpenDescriptionsFilmType | null
    totalResults:string
    currentPage:number
    titleSearchFilm:string
    isLoading:boolean
}
type getFilmsACtype = ReturnType<typeof setSearchFilms>
type setSearchOneFilmACtype = ReturnType<typeof setSearchOneFilm>
type setTotalResultPagesFilmACtype = ReturnType<typeof setTotalResultFilm>
type setCurrentPageACtype = ReturnType<typeof setCurrentPage>
type setTitleSearchFilmsACtype = ReturnType<typeof setTitleSearchFilms>
type setIsLoadingFilmsACtype = ReturnType<typeof setIsLoading>

const initialState = {
    films: [],
    film: null,
    totalResults: '',
    currentPage:1,
    titleSearchFilm:'',
    isLoading:false
}

export const AppReducer = (state: initialStateType = initialState, action: allActionsTypeAppReducer):initialStateType => {
    switch (action.type) {
        case "APP/SET-FILMS": {
            return {...state, films: action.films}
        }
        case "APP/SET-ONE-FILM": {
            return {...state, film: action.film}
        }
        case "APP/SET-TOTAL-RESULT":{
        return {...state,totalResults:action.totalResult}
        }
        case "APP/SET-CURRENT-PAGE":{
            return {...state,currentPage:action.page}
        }
        case "APP/SET-TITLE-SEARCH-FILMS":{
            return {...state,titleSearchFilm:action.title}
        }
        case "APP/SET-IS-LOADING":{
            return {...state,isLoading:action.value}
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
const setTotalResultFilm = (totalResult:string) => {
    return {type: 'APP/SET-TOTAL-RESULT', totalResult} as const
}
export const setCurrentPage = (page:number) => {
    return {type: 'APP/SET-CURRENT-PAGE', page} as const
}
 export const setTitleSearchFilms = (title:string) => {
    return {type: 'APP/SET-TITLE-SEARCH-FILMS', title} as const
}
export const setIsLoading = (value:boolean) => {
    return {type: 'APP/SET-IS-LOADING', value} as const
}

export const getFilmsTC = (titleSearchFilm: string,page:number) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    const result = await api.getMovies(titleSearchFilm,page)
    dispatch(setTitleSearchFilms(titleSearchFilm))
    dispatch(setCurrentPage(page))
    dispatch(setSearchFilms(result.data.Search))
    dispatch(setTotalResultFilm(result.data.totalResults))
    dispatch(setIsLoading(false))
}

export const getOneFilmTC = (id: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    const result = await api.getFilm(title)
    dispatch(setSearchOneFilm(id, result.data))
    dispatch(setIsLoading(false))
}