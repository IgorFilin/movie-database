import React, {ChangeEvent, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "../../bll/store";
import {filmType} from "../../api/app-api";
import {getFilmsTC, getOneFilmTC} from "../../bll/app-reducer";
import c from './SearchFilms.module.css'
import {Button, CircularProgress, Pagination, Paper, TextField} from "@mui/material";

export const SearchFilms = () => {
    const [valueInput, setValueInput] = useState('')
    const [Error, setError] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const films = useSelector<AppStoreType, Array<filmType>>(state => state.app.films)
    const totalResult = useSelector<AppStoreType, string>(state => state.app.totalResults)
    const currentPage = useSelector<AppStoreType, number>(state => state.app.currentPage)
    const titleSearchFilm = useSelector<AppStoreType, string>(state => state.app.titleSearchFilm)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.app.isLoading)

    const allPagesCount = Math.ceil(+totalResult / 10)

    const onClickHandlerSearchByTitle = (id: string, title: string) => {
        dispatch(getOneFilmTC(id, title))
    }
    const onChangeHandlerTextField = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValueInput(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if(valueInput.trim() === ''){
            setError('Field required')
        }else {
            dispatch(getFilmsTC(valueInput, 1))
            setValueInput('')
        }

    }

    const onChangeHandlerPagination = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getFilmsTC(titleSearchFilm, page))
    }

    const searchFilms = films.map(film => {
        return (
            <div key={film.imdbID} className={c.film}
                 onClick={() => onClickHandlerSearchByTitle(film.imdbID, film.Title)}>
                <Paper elevation={3}>
                    <NavLink className={c.navLink} to={'film/' + film.imdbID}>
                        <h2>{film.Title}</h2>
                        <img src={film.Poster}/>
                        <h3>{film.Type}</h3>
                        <h3>{film.Year}</h3>
                    </NavLink>
                </Paper>
            </div>

        )
    })
    if (isLoading) {
        return <CircularProgress style={{display: 'flex', alignSelf: 'center'}}/>
    }

    return <div className={c.containerSearchFilms}>
        <TextField style={{margin: '10px'}} value={valueInput} onChange={onChangeHandlerTextField} color={"info"}
                   variant="outlined"/>
        {Error ? <h3 style={{color:'red'}}>{Error}</h3> : <br/>}
        <Button variant="outlined" onClick={onClickHandler}>Request films</Button>
        <Pagination style={{margin: '10px'}} page={currentPage} onChange={onChangeHandlerPagination}
                    count={allPagesCount}/>
        {searchFilms}
    </div>;
};
