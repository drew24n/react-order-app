import React from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

export const OrderInfo = () => {
    let appState = useSelector(state => state.app)

    let time = new Date().clearTime().addSeconds(appState.time).toString(`H ч. mm мин.`);

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
                        {typeof appState.time === 'number'
                            ? `Время выполнения: ${time}`
                            : `Срок сдачи: ${appState.time.toString('d.MM.yy')} в ${appState.time.toString('HH:mm')}`
                        }
                    </div>
                </div>
                <button>Заказать</button>
            </div>
        </div>
    )
}