import axios from "axios";

const instance = axios.create({
    baseURL: 'http://www.omdbapi.com/',
    withCredentials: true,
})
const key = 'a5aa57ed'

export type filmType = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}
export type getResponseType = {
    Search: Array<filmType>
    totalResults: string,
    Response: boolean
}


export const api = {
    getMovie(nameFilm: string) {
        return instance.get<getResponseType>(`?apikey=${key}&s=${nameFilm}`)
    }
}
// http://www.omdbapi.com/?apikey=a5aa57ed&s=batman