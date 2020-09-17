import React from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

export const OrderInfo = () => {
    let appState = useSelector(state => state.app)

    let calcTime = (seconds) => {
        let hours = Math.floor(seconds / 3600)
        let minutes = Math.floor((seconds - (hours * 3600)) / 60)
        return `Выполним через: ${hours ? `${hours} ч.` : ''} ${minutes ? `${minutes} мин.` : ''}`
    }

    let formatDate = (date) => `Срок сдачи: ${date.slice(0, 8)} в ${date.slice(11, -3)}`

    return (
        <div>
            <div className={style.container}>
                <div className={style.priceTime}>
                    <div>{appState.price.toLocaleString('ru', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} грн
                    </div>
                    <div style={appState.time ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                        {appState.time.toString().length === 20 ? formatDate(appState.time) : calcTime(appState.time)}
                    </div>
                </div>
                <button>Заказать</button>
            </div>
        </div>
    )
}