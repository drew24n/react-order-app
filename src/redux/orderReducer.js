const SET_LANG = "SET_LANG"
const SET_PRICE_RATE = "SET_PRICE_RATE"
const SET_CONTENT = "SET_CONTENT"
const SET_PRICE = "SET_PRICE"
const SET_TIME = "SET_TIME"

const initialState = {
    lang: '',
    priceRate: 0,
    time: 0,
    price: 0,
    content: {
        text: '',
        length: 0,
        fileName: ''
    }
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANG:
            return {...state, lang: action.lang}
        case SET_PRICE_RATE:
            return {...state, priceRate: action.priceRate}
        case SET_PRICE:
            return {...state, price: action.price}
        case SET_TIME:
            return {...state, time: action.time}
        case SET_CONTENT:
            return {
                ...state, content: {
                    text: action.content.text,
                    length: action.content.length,
                    fileName: action.content.fileName
                }
            }
        default:
            return state
    }
}

export const setLang = (lang) => ({type: SET_LANG, lang})
export const setPriceRate = (priceRate) => ({type: SET_PRICE_RATE, priceRate})
export const setContent = (content) => ({type: SET_CONTENT, content})
export const setTime = (time) => ({type: SET_TIME, time})
export const setPrice = (price) => ({type: SET_PRICE, price})