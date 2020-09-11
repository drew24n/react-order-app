import React from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

export const OrderInfo = () => {
    let appState = useSelector(state => state.app)

    let hours = appState.time / 3600 ^ 0
    let minutes = (appState.time - hours * 3600) / 60 ^ 0

    return (
        <div>
            <div className={style.container}>
                <div className={style.priceTime}>
                    <div>{appState.price.toLocaleString('ru', {minimumFractionDigits: 2})} грн</div>
                    <div style={appState.time ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                        Время выполнения: {hours} ч {minutes} мин
                    </div>
                </div>
                <button>Заказать</button>
            </div>
        </div>
    )
}