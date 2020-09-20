import React from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

export const OrderInfo = ({time}) => {
    let appState = useSelector(state => state.app)

    function roundOrderTime() {
        let hours = Math.floor(appState.orderTime / 3600)
        let minutes = Math.floor((appState.orderTime - (hours * 3600)) / 60)
        if (minutes <= 30) return hours === 0 ? '1 ч.' : `${hours} ч. 30 мин.`
        else return (hours + 1) + ' ч.'
    }

    function roundDeadlineTime() {
        let hours = Math.floor(time / 3600)
        let minutes = Math.floor((time - (hours * 3600)) / 60)
        if (minutes <= 30) {
            if (hours === 0) {
                return new Date(Date.parse(appState.date)).addHours(1).setMinutes(0)
            } else {
                return new Date(Date.parse(appState.date)).setMinutes(30)
            }
        } else {
            return new Date(Date.parse(appState.date)).addHours(1).setMinutes(0)
        }
    }

    return (
        <div>
            <div className={style.container}>
                <div className={style.priceTime}>
                    <div>{appState.price.toLocaleString('ru', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} грн
                    </div>
                    <div style={appState.date ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                        {appState.orderTime
                            ? `Выполним через: ${roundOrderTime()}`
                            : new Date(roundDeadlineTime()).toString('Срок сдачи: dd.MM.yyyy в HH:mm')
                        }
                    </div>
                </div>
                <button>Заказать</button>
            </div>
        </div>
    )
}