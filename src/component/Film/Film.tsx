import React from "react";
import {OpenDescriptionsFilmType} from "../../api/app-api";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../bll/store";
import c from './Film.module.css'
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

type FilmPropsType = {}
export const Film: React.FC<FilmPropsType> = () => {
    const film = useSelector<AppStoreType, OpenDescriptionsFilmType | null>(state => state.app.film)
    const isLoading = useSelector<AppStoreType, boolean>(state => state.app.isLoading)

    let navigate = useNavigate();


    const onClickHandler = () => {
        navigate('/')
    }
    if (isLoading) {
        return <CircularProgress style={{display:'flex',alignSelf:'center'}}/>

    }
    return (
        <div className={c.container}>
            <Button variant={"contained"} onClick={onClickHandler}>back</Button>
            <h2>{film?.Title}</h2>
            <img src={film?.Poster} alt=""/>
            <div>
                <div>Type : {film?.Type}</div>
                <div>Year : {film?.Year}</div>
                <div>Released : {film?.Released}</div>
                <div>DVD : {film?.DVD}</div>
                <div>Actors : {film?.Actors}</div>
                <div>Director : {film?.Director}</div>
                <div>Runtime : {film?.Runtime}</div>
                <div>Language : {film?.Language}</div>
                <div>Country : {film?.Country}</div>
            </div>
            <h3>Descriptions :</h3>
            <div> {film?.Plot}</div>
            <div></div>
        </div>
    )
}