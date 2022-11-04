import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "./bll/store";
import {filmType, OpenDescriptionsFilmType} from "./api/app-api";
import {getFilmsTC, getOneFilmTC} from "./bll/app-reducer";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";

const AppDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: azure;

  & input {
    width: 200px;
    height: 20px;
  }

  & button {
    width: 100px;
    height: 20px;
  }
`

function App() {
    const [valueInput, setValueInput] = useState('')

    const films = useSelector<AppStoreType, Array<filmType>>(state => state.app.films)
    const film = useSelector<AppStoreType, OpenDescriptionsFilmType | null>(state => state.app.film)

    const dispatch = useDispatch<AppDispatch>()

    const onClickHandlerSearchByTitle = (id: string, title: string) => {
        dispatch(getOneFilmTC(id, title))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }

    const onClickHandler = () => {
        dispatch(getFilmsTC(valueInput))
    }

    const searchFilms = films.map((film, index) => {
        return (
            <NavLink to={'film/' + film.imdbID} key={index}>
                <h5 onClick={() => onClickHandlerSearchByTitle(film.imdbID, film.Title)}>{film.Title}</h5>
                <img src={film.Poster}/>
                <h5>{film.Type}</h5>
                <h5>{film.Year}</h5>
            </NavLink>
        )
    })
    return (
        <AppDiv>
            <input value={valueInput} onChange={onChangeHandler} type="text"/>
            <button onClick={onClickHandler}>request film</button>

            <Routes>
                <Route path={'/'} element={searchFilms}/>
                <Route path={'film/*'} element={<Film film={film}/>}/>
            </Routes>
        </AppDiv>
    );
}

export default App;


type FilmPropsType = {
    film: OpenDescriptionsFilmType | null
}
export const Film: React.FC<FilmPropsType> = ({film}) => {
    return (
        <div>
            <img src={film?.Poster} alt=""/>
            <div>{film?.Title}</div>
            <div>{film?.Type}</div>
            <div>{film?.Year}</div>
            <div>{film?.Released}</div>
            <div>{film?.DVD}</div>
            <div>{film?.Actors}</div>
            <div>{film?.Director}</div>
            <div>{film?.Runtime}</div>
            <div>{film?.Language}</div>
            <div>{film?.Country}</div>
            <div>{film?.Plot}</div>
            <div></div>
        </div>
    )
}