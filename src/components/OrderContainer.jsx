import React, {useEffect} from 'react';
import style from './OrderContainer.module.scss';
import OrderInfo from "./OrderInfo/OrderInfo";
import {useDispatch, useSelector} from "react-redux";
import {setContent, setPrice, setPriceRate, setTime} from "../redux/orderReducer";
import FirstSection from "./OrderForm/FirstSection/FirstSection";
import SecondSection from "./OrderForm/SecondSection/SecondSection";
import ThirdSection from "./OrderForm/ThirdSection/ThirdSection";

export function OrderContainer() {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.order)

    const price = function () {
        const minPrice = orderState.lang === 'English' ? 120 : 50
        const pricePerSymbol = orderState.lang === 'English' ? 0.12 : 0.05
        const normalPrice = pricePerSymbol * orderState.content.length
        if (orderState.priceRate === 0.2) {
            const ratedPrice = normalPrice * orderState.priceRate + normalPrice
            if (ratedPrice < minPrice) {
                return minPrice
            } else return ratedPrice
        } else {
            if (normalPrice < minPrice) {
                return minPrice
            } else return normalPrice
        }
    }()

    const time = function () {
        const minTime = 1800
        const speedRate = orderState.lang === 'English' ? (333 / 3600) : (1333 / 3600)
        const normalTime = minTime + orderState.content.length / speedRate
        if (orderState.priceRate === 0.2) {
            return normalTime * orderState.priceRate + normalTime
        } else return normalTime
    }()

    function addFile(file) {
        if (file.target.files[0].size > 0) {
            dispatch(setContent({
                text: '',
                length: file.target.files[0].size + 1,
                fileName: file.target.files[0].name
            }))
            const fileType = file.target.files[0].name.split('.').pop()
            if (fileType !== ('doc' || 'docx' || 'rtf')) {
                dispatch(setPriceRate(0.2))
            }
        }
    }

    function resetFile() {
        document.getElementById('file_upload').type = 'text'
        document.getElementById('file_upload').type = 'file'
        dispatch(setPriceRate(0))
        dispatch(setContent({
            text: '',
            length: 0,
            fileName: ''
        }))
    }

    useEffect(() => {
        if (orderState.content.length && orderState.lang) {
            dispatch(setTime(time))
            dispatch(setPrice(price))
        } else if (!orderState.content.length) {
            dispatch(setTime(0))
            dispatch(setPrice(0))
        }
    }, [orderState.content.length, orderState.lang, time, price, dispatch])

    return (
        <form onSubmit={e => e.preventDefault()} className={style.container}>
            <div>
                <FirstSection addFile={addFile} resetFile={resetFile}/>
                <SecondSection/>
                <ThirdSection/>
            </div>
            <OrderInfo/>
        </form>
    )
}