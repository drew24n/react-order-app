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
    let minTime = 1800
    let speedRate = appState.lang === 'Английский' ? (333 / 3600) : (1333 / 3600)
    let basicTime = minTime + appState.contentSize / speedRate
    let timeWithPriceRate = basicTime * appState.priceRate + basicTime

    //rounding minutes (+30 min step)
    function roundOrderTime(orderTime) {
        let hours = Math.floor(orderTime / 3600)
        let minutes = Math.floor((orderTime - (hours * 3600)) / 60)
        let seconds = orderTime - (hours * 3600) - (minutes * 60)
        if (minutes <= 29.9999) {
            return new Date().clearTime().addHours(hours).addMinutes(30).addSeconds(seconds)
        } else return new Date().clearTime().addHours(hours + 1)
    }

    let orderTime = roundOrderTime(timeWithPriceRate)
    let orderTimeToMs = orderTime.getHours() * 3600000 + orderTime.getMinutes() * 60000 + orderTime.getSeconds() * 1000

    //date calculations
    const date = Date.today()
    let weekDay = date.getDay() //day of week

    //working time left until 19:00
    let workingTimeLeft = date.setHours(19) - date.setTimeToNow()

    //check if working day has already begun
    let workingDayStarted = new Date(date.setTimeToNow()) - new Date(date.clearTime().setHours(10, 0, 0)) >= 0

    //deadline
    function calcDeadline() {
        //check if saturday or sunday - move to monday and set time for 10:00 + order time
        if (weekDay === 6 || weekDay === 0) {
            return new Date(date.next().monday().setHours(10 + orderTime.getHours(), orderTime.getMinutes()))
        } else if (weekDay === 5 && workingTimeLeft - orderTimeToMs < 0) {
            //check if friday and not enough working time - go to next monday and set 10:00 + order time
            return new Date(date.next().monday().setHours(10 + orderTime.getHours(), orderTime.getMinutes()))
        } else if (workingDayStarted && workingTimeLeft - orderTimeToMs < 0) {
            //working day started and not enough time for order - go to another day at 10:00 + order time
            return new Date(date.addDays(1).setHours(10 + orderTime.getHours(), orderTime.getMinutes()))
        } else if (!workingDayStarted) {
            //if working day not started - set 10 hours + order time
            return new Date(date.setHours(10 + orderTime.getHours(), orderTime.getMinutes()))
            //if working day and order can be done today - return just a time
        } else return orderTime.toString(`H ч. mm мин.`)
    }

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
            dispatch(setTime(calcDeadline()))
            if (finalPrice < minPrice) dispatch(setPrice(minPrice))
            else dispatch(setPrice(finalPrice))
        } else {
            dispatch(setTime(''))
            dispatch(setPrice(0))
        }
    }, [appState.contentSize, appState.lang])

    return (
        <form onSubmit={e => e.preventDefault()} className={style.container}>
            <OrderForm processFile={processFile} resetFile={resetFile}/>
            <OrderInfo/>
        </form>
    )
}