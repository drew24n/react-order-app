import React from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setComment, setData, setEmail, setLang, setName} from "./redux/appReducer";

export const App = () => {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)
    
    return <div className={style.container}>
        <form onSubmit={e => e.preventDefault()}>
            <input value={appState.email} onChange={e => dispatch(setEmail(e.target.value))} type="email"
                   placeholder={'email'}/>
            <input value={appState.name} onChange={e => dispatch(setName(e.target.value))} type="text"
                   placeholder={'name'}/>
            <textarea value={appState.data} onChange={e => dispatch(setData(e.target.value))} placeholder={'text'}/>
            <div onChange={e => dispatch(setLang(e.target.value))}>
                <input type="radio" name={'lang'} value={'rus'}/>
                <input type="radio" name={'lang'} value={'ukr'}/>
                <input type="radio" name={'lang'} value={'eng'}/>
            </div>
            <input value={appState.comment} onChange={e => dispatch(setComment(e.target.value))} type="text"
                   placeholder={'comment'}/>
            <button>Заказать</button>
        </form>
        <div>Цена</div>
        <div>Время</div>
    </div>
}
