import axios from "axios";

const instance = axios.create({
    baseURL: 'http://www.omdbapi.com/',
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
export type OpenDescriptionsFilmType = {
    Title: string
    Year: string
    Rated: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: [
        {
            Source: string
            Value: string
        },
        {
            Source: string
            Value: string
        },
        {
            Source: string
            Value: string
        }
    ],
    Metascore: string
    Released:string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}


export const api = {
    getMovies(nameFilm: string,page:number) {
        return instance.get<getResponseType>(`?apikey=${key}&s=${nameFilm}&page=${page}`)
    },
    getFilm(title:string){
      return instance.get<OpenDescriptionsFilmType>(`?apikey=${key}&plot=full&t=${title}`)
    }
}
// http://www.omdbapi.com/?apikey=a5aa57ed&s=batman