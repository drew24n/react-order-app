import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setComment, setText, setEmail, setLang, setName} from "../redux/appReducer";

export const App = () => {
    const dispatch = useDispatch()
    const appState = useSelector(state => state.app)

    const languages = ['Украинский', 'Русский', 'Английский']

    //price calculations
    const [fileTypePriceRate, setFileTypePriceRate] = useState(0)
    const [fileContentLength, setFileContentLength] = useState(0)
    const [price, setPrice] = useState(0)

    let languagePriceRate = appState.currentLang === 'Английский' ? 0.12 : 0.05
    let minPrice = appState.currentLang === 'Английский' ? 120 : 50

    let contentLength = fileContentLength > 0 ? fileContentLength : appState.text.length
    let basicPrice = languagePriceRate * contentLength
    let finalPrice = basicPrice * fileTypePriceRate + basicPrice

    const processFileData = (file) => {
        if (file.target.files[0]) {
            dispatch(setText(''))
            setFileContentLength(file.target.files[0].size)
            let fileType = file.target.files[0].name.split('.').pop()
            if (fileType !== ('doc' || 'docx' || 'rtf')) {
                setFileTypePriceRate(0.2)
            } else {
                setFileTypePriceRate(0)
            }
        } else {
            setFileContentLength(0)
            setFileTypePriceRate(0)
        }
    }

    //deadline and job time calculations
    const [time, setTime] = useState(0)

    const minTime = 3600
    let currentSpeedRate = appState.currentLang === 'Английский' ? 0.093 : 0.37 //typing speed, symbols per second

    let h = time / 3600 ^ 0
    let m = (time - h * 3600) / 60 ^ 0
    let s = (time - h * 3600 - m * 60).toFixed()
    // console.log((h < 10 ? "0" + h : h) + " ч. " + (m < 10 ? "0" + m : m) + " мин. " + (s < 10 ? "0" + s : s) + " сек.")

    // let deadline = 0
    // const calcDeadline = () => {
    //     deadline = new Date()
    //
    //     let currentDay = deadline.getDay()
    //     let currentHour = deadline.getHours()
    //
    //     if (currentDay === 5) deadline.setDate(deadline.getDate() + 2)
    //     if (currentDay === 6) deadline.setDate(deadline.getDate() + 1)
    //     if (currentHour >= 0 && currentHour <= 10) deadline.setHours(10, 0, 0)
    //     if (currentHour >= 19) {
    //         deadline.setHours(10, 0, 0)
    //         deadline.setDate(deadline.getDate() + 1)
    //     }
    //     console.log(deadline)
    // }
    //
    // calcDeadline()

    useEffect(() => {
        if (!contentLength || !appState.currentLang) {
            setTime(0)
            setPrice(0)
        } else {
            let basicTime = minTime + contentLength / currentSpeedRate
            let finalJobTime = basicTime * fileTypePriceRate + basicTime //time depends on file type - fileTypePriceRate
            setTime(finalJobTime)

            if (finalPrice < minPrice) {
                setPrice(minPrice)
            } else setPrice(finalPrice)
        }
    }, [contentLength, fileTypePriceRate, appState.currentLang, currentSpeedRate, finalPrice, minPrice])

    return (
        <form className={style.container}>
            <div>
                <div className={style.firstSection}>
                    <h3>ЗАКАЗАТЬ РЕДАКТИРОВАНИЕ</h3>
                    <p>Исправим все ошибки и огрехи, уберем все глупости из текста, перефразируем неудачные места, но
                        сильно переписывать текст не станем. Лишних правок не будет.
                        <a href="/#"> Подробнее о редактировании</a>
                    </p>
                    <input value={appState.email} onChange={e => dispatch(setEmail(e.target.value))} type="email"
                           placeholder={'Ваша эл. почта'}/>
                    <input value={appState.name} onChange={e => dispatch(setName(e.target.value))} type="text"
                           placeholder={'Ваше имя'}/>
                    <div>
                        <textarea value={appState.text} onChange={e => dispatch(setText(e.target.value))}
                                  placeholder={'Введите текст или загрузите файл'}/>
                        <label htmlFor="image_uploads">загрузите файл
                            <input id="image_uploads" type="file" onChange={e => processFileData(e)}/>
                        </label>
                        <div>{contentLength}</div>
                    </div>
                </div>
                <div onChange={e => dispatch(setLang(e.target.value))}>
                    <h3>Язык</h3>
                    {languages.map((l, index) => (
                        <div key={index}>
                            <input type="radio" name={'lang'} value={l} id={l}/>
                            <label htmlFor={l}>{l}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <input value={appState.comment} onChange={e => dispatch(setComment(e.target.value))} type="text"
                           placeholder={'Короткий комментарий или ссылка'}/>
                </div>
            </div>
            <div>
                <div>{price.toFixed(2)} грн.</div>
                <div>Сдадим через: {h} ч. {m} мин. {s} сек.</div>
                <button>Заказать</button>
            </div>
        </form>
    )
}