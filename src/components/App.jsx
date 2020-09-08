import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setComment, setText, setEmail, setLang, setName} from "../redux/appReducer";

export const App = () => {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)

    const languages = ['Английский', 'Русский', 'Украинский']

    let languagePriceRate = appState.currentLang === 'Английский' ? 0.12 : 0.05
    let minPrice = appState.currentLang === 'Английский' ? 120 : 50

    const [fileTypePriceRate, setFileTypePriceRate] = useState(0)
    const [fileContentLength, setFileContentLength] = useState(0)
    const processFileData = (file) => {
        if (file.target.files[0]) {
            dispatch(setText(''))
            setFileContentLength(file.target.files[0].size)
            let fileType = file.target.files[0].name.split('.').pop()
            if (fileType !== ('doc' || 'docx' || 'rtf')) setFileTypePriceRate(0.2)
            else setFileTypePriceRate(0)
        } else {
            setFileContentLength(0)
            setFileTypePriceRate(0)
        }
    }

    let dataLength = fileContentLength > 0 ? fileContentLength : appState.text.length
    let price = languagePriceRate * dataLength
    let priceWithRate = price * fileTypePriceRate + price

    const [finalPrice, setFinalPrice] = useState(0)

    useEffect(() => {
        if (priceWithRate !== 0 && priceWithRate <= minPrice) setFinalPrice(minPrice)
        else setFinalPrice(priceWithRate)
    }, [appState.currentLang, dataLength, fileTypePriceRate])

    return <div className={style.container}>
        <form>
            {/*<input value={appState.email} onChange={e => dispatch(setEmail(e.target.value))} type="email"*/}
            {/*       placeholder={'email'}/>*/}
            {/*<input value={appState.name} onChange={e => dispatch(setName(e.target.value))} type="text"*/}
            {/*       placeholder={'name'}/>*/}
            <div>
                <textarea value={appState.text} onChange={e => dispatch(setText(e.target.value))} placeholder={'text'}/>
                <input type="file" onChange={e => processFileData(e)}/>
            </div>
            <div>{fileContentLength ? fileContentLength : appState.text.length}</div>
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
        <div>Цена: {finalPrice.toFixed(2)}</div>
        {/*<div>Время</div>*/}
    </div>
}