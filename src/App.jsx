import React, {useEffect} from 'react';
import style from './App.module.scss';
import {OrderForm} from "./components/OrderForm/OrderForm";
import {OrderInfo} from "./components/OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "react-redux";
import {setContentSize, setFileName, setPrice, setPriceRate, setTime} from "./redux/appReducer";
import 'datejs';

//deadline calculation function

export function calcDeadline(time, date) {
    let weekDay = date.getDay()
    let timeNow = date.getTime()
    let isWorkingDayStarted = timeNow - date.clearTime().set({hour: 10, minute: 0, second: 0}).getTime() >= 0
    let workingTimeLeft = (date.set({hour: 19, minute: 0, second: 0}).getTime() - timeNow) / 1000

    //round order time to the closest 30 minutes / hour, returns seconds
    function roundOrderTime() {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor((time - (hours * 3600)) / 60)
        if (minutes <= 30) return hours === 0 ? 3600 : hours * 3600 + 1800
        else return (hours + 1) * 3600
    }

    let orderTime = roundOrderTime()

    if (weekDay === 6 || weekDay === 0) {
        return new Date(date.next().monday().setHours(10, 0, orderTime))
            .toLocaleString("ru", {timeZone: "Europe/Kiev"})
    } else if (weekDay === 5 && isWorkingDayStarted && workingTimeLeft - orderTime < 0) {
        return new Date(date.next().monday().setHours(10, 0, orderTime))
            .toLocaleString("ru", {timeZone: "Europe/Kiev"})
    } else if (isWorkingDayStarted && workingTimeLeft - orderTime < 0) {
        return new Date(date.addDays(1).setHours(10, 0, orderTime))
            .toLocaleString("ru", {timeZone: "Europe/Kiev"})
    } else if (!isWorkingDayStarted) {
        return new Date(date.setHours(10, 0, orderTime))
            .toLocaleString("ru", {timeZone: "Europe/Kiev"})
    } else return orderTime
}

////////////////////////////////////////////////////////////////////////////////////

export const App = () => {
    //redux
    let dispatch = useDispatch()
    let appState = useSelector(state => state.app)

    //price calculations
    let minBasicPrice = appState.lang === 'Английский' ? 120 : 50
    let languagePriceRate = appState.lang === 'Английский' ? 0.12 : 0.05
    let price = languagePriceRate * appState.contentSize
    let orderPrice = price * appState.priceRate + price

    //order time calculations
    let minBasicTime = 1800
    let speedRate = appState.lang === 'Английский' ? (333 / 3600) : (1333 / 3600)
    let basicTime = minBasicTime + appState.contentSize / speedRate
    let time = basicTime * appState.priceRate + basicTime //time required to complete an order (seconds)

    let date = () => new Date(Date.today()).setTimeToNow() //current date

    function processFile(file) {
        if (file.target.files[0].size > 0) {
            dispatch(setFileName(file.target.files[0].name))
            dispatch(setContentSize(file.target.files[0].size + 1))
            let fileType = file.target.files[0].name.split('.').pop()
            if (fileType !== ('doc' || 'docx' || 'rtf')) dispatch(setPriceRate(0.2))
            else dispatch(setPriceRate(0))
        }
    }

    function resetFile() {
        document.getElementById('file_upload').type = 'text'
        document.getElementById('file_upload').type = 'file'
        dispatch(setFileName(''))
        dispatch(setContentSize(0))
        dispatch(setPriceRate(0))
    }

    useEffect(() => {
        if (appState.contentSize && appState.lang) {
            dispatch(setTime(calcDeadline(time, date())))
            if (orderPrice < minBasicPrice) dispatch(setPrice(minBasicPrice))
            else dispatch(setPrice(orderPrice))
        } else {
            dispatch(setTime(''))
            dispatch(setPrice(0))
        }
    }, [appState.contentSize, appState.lang, dispatch, minBasicPrice, orderPrice, time])

    return (
        <form onSubmit={e => e.preventDefault()} className={style.container}>
            <OrderForm processFile={processFile} resetFile={resetFile}/>
            <OrderInfo/>
        </form>
    )
}