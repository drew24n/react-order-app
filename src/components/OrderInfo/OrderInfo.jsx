import React, {memo} from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";

function OrderInfo() {
    const orderState = useSelector(state => state.order)

    const roundedTime = function () {
        const hours = Math.floor(orderState.time / 3600)
        const minutes = Math.floor((orderState.time - (hours * 3600)) / 60)
        if (minutes <= 30) {
            return hours === 0 ? '1h' : `${hours}h 30m`
        } else return (hours + 1) + 'h'
    }()

    return (
        <div>
            <div className={style.container}>
                <div className={style.priceTime}>
                    <div>{orderState.price.toFixed(2)} UAH</div>
                    <div>{orderState.time ? `Will be done in: ${roundedTime}` : null}</div>
                </div>
                <button>Order</button>
            </div>
        </div>
    )
}

export default memo(OrderInfo)