import React, {useState} from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";

export const App = () => {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)

    const [price, setPrice] = useState(0)
    const calcPrice = (data, lang) => {}

    return <div className={style.container}>
    </div>
}
