import React, {useEffect} from 'react';
import style from './App.module.scss';
import {OrderForm} from "./components/OrderForm/OrderForm";
import {OrderInfo} from "./components/OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "react-redux";
import {setContentSize, setFileName, setPrice, setPriceRate, setTime} from "./redux/appReducer";
import 'datejs';

export const App = () => {
    let dispatch = useDispatch()
    let appState = useSelector(state => state.app)

    //price calculations
    let minPrice = appState.lang === 'Английский' ? 120 : 50
    let languagePriceRate = appState.lang === 'Английский' ? 0.12 : 0.05
    let basicPrice = languagePriceRate * appState.contentSize
    let finalPrice = basicPrice * appState.priceRate + basicPrice

    //time calculations
    let minTime = 3600
    let speedRate = appState.lang === 'Английский' ? (333 / 3600) : (1333 / 3600)
    let basicTime = minTime + appState.contentSize / speedRate
    let orderTime = basicTime * appState.priceRate + basicTime //order time (ms) with price rate included

    //date calculations
    let date = Date.today() //current date
    let weekDay = date.getDay() //day of week

    let workingTimeLeft = date.setHours(19) - date.setTimeToNow() //working time left until 19:00 PM

    let deadline = () => {
        if (weekDay === 6 || weekDay === 0) { //check if saturday or sunday - move to monday and set time for 10:00
            return new Date(date.next().monday().setHours(10, 0, orderTime))
        } else if (workingTimeLeft - orderTime * 1000 >= 0) { //working day - check if enough time to finish an order
            return orderTime //if order can be done today - return just a time
        } else if (workingTimeLeft - orderTime * 1000 < 0 && weekDay === 5) { //check if friday and not enough time
            return new Date(date.next().monday().setHours(10, 0, orderTime)) //go to next monday and set 10:00
        } else return new Date(date.addDays(1).setHours(10, 0, orderTime)) //move to next day
    }

    let processFile = (file) => {
        if (file.target.files[0] && file.target.files[0].size > 0) {
            dispatch(setFileName(file.target.files[0].name))
            dispatch(setContentSize(file.target.files[0].size + 1))
            let fileType = file.target.files[0].name.split('.').pop()
            if (fileType !== ('doc' || 'docx' || 'rtf')) dispatch(setPriceRate(0.2))
            else dispatch(setPriceRate(0))
        }
    }

    let resetFile = () => {
        document.getElementById('file_upload').type = 'text'
        document.getElementById('file_upload').type = 'file'
        dispatch(setFileName(''))
        dispatch(setContentSize(0))
        dispatch(setPriceRate(0))
    }

    useEffect(() => {
        if (appState.contentSize && appState.lang) {
            dispatch(setTime(deadline()))
            if (finalPrice < minPrice) dispatch(setPrice(minPrice))
            else dispatch(setPrice(finalPrice))
        } else {
            dispatch(setTime(0))
            dispatch(setPrice(0))
        }
    }, [appState.contentSize, appState.lang, dispatch, finalPrice, minPrice])

    return (
        <form onSubmit={e => e.preventDefault()} className={style.container}>
            <OrderForm processFile={processFile} resetFile={resetFile}/>
            <OrderInfo/>
        </form>
    )
}