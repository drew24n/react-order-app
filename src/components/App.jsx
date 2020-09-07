import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setComment, setData, setEmail, setLang, setName} from "../redux/appReducer";

export const App = () => {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)

    const languages = ['Английский', 'Русский', 'Украинский']

    //price calculations
    let languagePriceRate = 0 //if language is not selected
    if (appState.currentLang) languagePriceRate = appState.currentLang === 'Английский' ? 0.12 : 0.05

    let minPrice = 0 //if text or file is not added
    if (appState.data) minPrice = appState.currentLang === 'Английский' ? 120 : 50

    let calculatedPrice = languagePriceRate * appState.data.length

    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (calculatedPrice <= minPrice) setPrice(minPrice)
        else setPrice(calculatedPrice)
    }, [appState.currentLang, appState.data])
    //price calculations - end

    return <div className={style.container}>
        <form onSubmit={e => e.preventDefault()}>
            {/*<input value={appState.email} onChange={e => dispatch(setEmail(e.target.value))} type="email"*/}
            {/*       placeholder={'email'}/>*/}
            {/*<input value={appState.name} onChange={e => dispatch(setName(e.target.value))} type="text"*/}
            {/*       placeholder={'name'}/>*/}
            <textarea value={appState.data} onChange={e => dispatch(setData(e.target.value))} placeholder={'text'}/>
            <br/>{appState.data.length}
            <div onChange={e => dispatch(setLang(e.target.value))}>
                {languages.map((l, index) => (
                    <div key={index}>
                        <label htmlFor={l}>{l}</label>
                        <input type="radio" name={'lang'} value={l} id={l}/>
                    </div>
                ))}
            </div>
            {/*<input value={appState.comment} onChange={e => dispatch(setComment(e.target.value))} type="text"*/}
            {/*       placeholder={'comment'}/>*/}
            {/*<button>Заказать</button>*/}
        </form>
        <div>Цена: {price.toFixed(2)}</div>
        {/*<div>Время</div>*/}
    </div>
}
