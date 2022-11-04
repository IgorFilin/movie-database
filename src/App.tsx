import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppStoreType} from "./bll/store";
import {filmType} from "./api/app-api";

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
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
    const [valueInput,setValueInput] = useState('')

    const films = useSelector<AppStoreType, Array<filmType>>(state => state.app.films)

    const searchFilms = films.map(film => {
        return (
            <>
                <h1>{film.Title}</h1>
                <div>{film.Poster}</div>
            </>
        )
    })

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }
    const onClickHandler = () => {

    }
    return (
        <AppDiv>
            <input value={valueInput} onChange={onChangeHandler} type="text"/>
            <button onClick={onClickHandler}>request film</button>
            {searchFilms}
        </AppDiv>
    );
}

export default App;
