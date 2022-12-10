import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStoreType} from "../../bll/store";
import {filmType, OpenDescriptionsFilmType} from "../../api/app-api";
import {getFilmsTC, getOneFilmTC} from "../../bll/app-reducer";
import c from './SearchFilms.module.css'
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";

export const SearchFilms = () => {
    const [nameMovie, setNameMovie] = useState('')
    const [yearMovie, setYearMovie] = useState('')
    const [type, setType] = React.useState('');
    const [Error, setError] = useState('Please,using english words')
    const [scroll, setScroll] = useState(0);

    const films = useSelector<AppStoreType, Array<filmType>>(state => state.app.films)
    const totalResult = useSelector<AppStoreType, string>(state => state.app.totalResults)
    const currentPage = useSelector<AppStoreType, number>(state => state.app.currentPage)
    const titleSearchFilm = useSelector<AppStoreType, string>(state => state.app.titleSearchFilm)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.app.isLoading)

    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const scrollStateValue = useSelector<AppStoreType, number>(state => state.app.scroll)

    const onScroll = useCallback(() => setScroll(Math.round(window.scrollY)), []);

    const allPagesCount = Math.ceil(+totalResult / 10)

    const onClickHandlerSearchByTitle = (id: string) => {
        dispatch(getOneFilmTC(id, scroll))

    }
    const onChangeHandlerNameMovie = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        let value = e.currentTarget.value
        value = value.replace(/[^A-Za-z\s+-/\d/]/ig, '')
        setNameMovie(value)
    }
    const onChangeHandlerYearMovie = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        let value = e.currentTarget.value
        setYearMovie(value)
    }

    const onClickHandler = () => {
        if (nameMovie.trim() === '') {
            setError('Field required')
        } else {
            dispatch(getFilmsTC(nameMovie.trim(), 1, yearMovie, type))
            setNameMovie('')
        }

    }

    const onChangeHandlerPagination = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getFilmsTC(titleSearchFilm, page, yearMovie, type))
    }

    useEffect(() => {
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    useEffect(() => window.scrollTo(0, scrollStateValue), []);


    const searchFilms = films.map(film => {
        return (
            <div key={film.imdbID} className={c.film}
                 onClick={() => onClickHandlerSearchByTitle(film.imdbID)}>
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
        <div className={c.groupInputs}>
            <TextField label="name movie" style={{margin: '10px'}} value={nameMovie} onChange={onChangeHandlerNameMovie}
                       color={"info"}
                       variant="outlined"/>
            <TextField label="year" style={{margin: '10px'}} value={yearMovie} onChange={onChangeHandlerYearMovie}
                       type='number' color={"secondary"}
                       variant="outlined"/>
            <Box style={{margin: '10px'}} sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Year"
                        onChange={handleChange}
                    >
                        <MenuItem value={'movie'}>Movie</MenuItem>
                        <MenuItem value={'series'}>Series</MenuItem>
                        <MenuItem value={'episode'}>Episode</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
        <Button variant="outlined" onClick={onClickHandler}>Request films</Button>
        <Pagination style={{margin: '10px'}} page={currentPage} onChange={onChangeHandlerPagination}
                    count={allPagesCount}/>
        {searchFilms}
    </div>
        ;
};

