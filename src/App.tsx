import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Film} from "./component/Film/Film";
import {SearchFilms} from "./component/SearchFilms/SearchFilms";
import c from './App.module.css'


function App() {
    return (
        <div className={c.mainContainer}>
            <Routes>
                <Route path={'/'} element={<SearchFilms/>}/>
                <Route path={'film/*'} element={<Film/>}/>
            </Routes>
        </div>
    );
}

export default App;


