import React from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

export const OrderInfo = () => {
    let appState = useSelector(state => state.app)

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
                        {appState.time.toString().length > 12
                            ? `Срок сдачи: ${appState.time.toString('d.MM.yy')} в ${appState.time.toString('HH:mm')}`
                            : `Время выполнения: ${appState.time}`
                        }
                    </div>
                </div>
                <button>Заказать</button>
            </div>
        </div>
    )
}