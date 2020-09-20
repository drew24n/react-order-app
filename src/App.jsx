import React, {useEffect} from 'react';
import style from './App.module.scss';
import {OrderForm} from "./components/OrderForm/OrderForm";
import {OrderInfo} from "./components/OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "react-redux";
import {setContentSize, setFileName, setPrice, setPriceRate, setDate, setOrderTime} from "./redux/appReducer";
import {store} from "./redux/store";
import 'datejs';

//deadline calculation function
export function calcDeadline(orderTime, date) {
    date = Date.parse(date)
    let weekDay = date.getDay()
    let timeNow = date.getTime()
    let isWorkingDayStarted = timeNow - date.set({hour: 10, minute: 0, second: 0}).getTime() >= 0
    let workingTimeLeft = (date.set({hour: 19, minute: 0, second: 0}).getTime() - timeNow) / 1000

    if (weekDay === 6 || weekDay === 0) {
        return new Date(date.next().monday().setHours(10, 0, orderTime))
            .toString('dddd, dd/MM/yyyy, HH:mm')
    } else if (weekDay === 5 && isWorkingDayStarted && workingTimeLeft - orderTime < 0) {
        return new Date(date.next().monday().setHours(10, 0, orderTime))
            .toString('dddd, dd/MM/yyyy, HH:mm')
    } else if (isWorkingDayStarted && workingTimeLeft - orderTime < 0) {
        return new Date(date.addDays(1).setHours(10, 0, orderTime))
            .toString('dddd, dd/MM/yyyy, HH:mm')
    } else if (!isWorkingDayStarted) {
        return new Date(date.setHours(10, 0, orderTime))
            .toString('dddd, dd/MM/yyyy, HH:mm')
    } else {
        store.dispatch(setOrderTime(orderTime)) //if order can be done today - set time
        return new Date(date.setTime(timeNow)).addSeconds(orderTime) //return date for testing purposes
            .toString('dddd, dd/MM/yyyy, HH:mm')
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

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

    //current date and time
    let date = () => new Date(Date.today()).setTimeToNow()

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
            dispatch(setDate(calcDeadline(time, date())))
            if (orderPrice < minBasicPrice) dispatch(setPrice(minBasicPrice))
            else dispatch(setPrice(orderPrice))
        } else {
            dispatch(setOrderTime(0))
            dispatch(setDate(''))
            dispatch(setPrice(0))
        }
    }, [appState.contentSize, appState.lang, dispatch, minBasicPrice, orderPrice, time])

    return (
        <form onSubmit={e => e.preventDefault()} className={style.container}>
            <OrderForm processFile={processFile} resetFile={resetFile}/>
            <OrderInfo time={time}/>
        </form>
    )
}