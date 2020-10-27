import React, {memo} from 'react';
import style from "./OrderInfo.module.scss";
import {useSelector} from "react-redux";
import moment from 'moment-business-time';

function OrderInfo() {
    const orderState = useSelector(state => state.order)

    const roundedTime = function () {
        const hours = Math.floor(orderState.time / 3600)
        const minutes = Math.floor((orderState.time - (hours * 3600)) / 60)
        if (minutes <= 30) {
            return hours === 0 ? '1h' : `${hours}h 30m`
        } else return (hours + 1) + 'h'
    }()

    const roundedDeadline = function () {
        if (orderState.deadline) {
            const start = moment(orderState.deadline, 'DD/MM/YYYY, HH:mm')
            const remainder = 30 - (start.minute() % 30)
            return moment(start).add(remainder, "minutes").format("DD/MM/YYYY, HH:mm")
        }
    }()

    const isTodayOrder = function () {
        const isWorkingTime = moment().add(orderState.time, 'seconds').nextWorkingTime()
        const today = moment()
        return moment(today).isSame(isWorkingTime, 'day')
    }()

    return (
        <div>
            <div className={style.container}>
                <div className={style.priceTime}>
                    <div>{orderState.price.toFixed(2)} UAH</div>
                    {isTodayOrder
                        ? <div>{orderState.time ? `Will be done in: ${roundedTime}` : null}</div>
                        : <div>{orderState.deadline ? `Deadline: ${roundedDeadline}` : null}</div>
                    }
                </div>
                <button>Order</button>
            </div>
        </div>
    )
}

export default memo(OrderInfo)