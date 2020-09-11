const SET_LANG = "SET_LANG"
const SET_TEXT = "SET_TEXT"
const SET_EMAIL = "SET_EMAIL"
const SET_NAME = "SET_NAME"
const SET_COMMENT = "SET_COMMENT"
const SET_PRICE_RATE = "SET_PRICE_RATE"
const SET_CONTENT_SIZE = "SET_CONTENT_SIZE"
const SET_FILE_NAME = "SET_FILE_NAME"
const SET_PRICE = "SET_PRICE"
const SET_TIME = "SET_TIME"

const initialState = {
    lang: '',
    text: '',
    email: '',
    name: '',
    comment: '',
    priceRate: 0,
    contentSize: 0,
    fileName: '',
    price: 0,
    time: 0
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANG:
            return {...state, lang: action.lang}
        case SET_TEXT:
            return {...state, text: action.text, contentSize: action.text.length}
        case SET_EMAIL:
            return {...state, email: action.email}
        case SET_NAME:
            return {...state, name: action.name}
        case SET_COMMENT:
            return {...state, comment: action.comment}
        case SET_PRICE_RATE:
            return {...state, priceRate: action.priceRate}
        case SET_CONTENT_SIZE:
            return {...state, contentSize: action.contentSize}
        case SET_FILE_NAME:
            return {...state, fileName: action.fileName}
        case SET_TIME:
            return {...state, time: action.time}
        case SET_PRICE:
            return {...state, price: action.price}
        default:
            return state
    }
}

export const setLang = (lang) => ({type: SET_LANG, lang})
export const setText = (text) => ({type: SET_TEXT, text})
export const setEmail = (email) => ({type: SET_EMAIL, email})
export const setName = (name) => ({type: SET_NAME, name})
export const setComment = (comment) => ({type: SET_COMMENT, comment})
export const setPriceRate = (priceRate) => ({type: SET_PRICE_RATE, priceRate})
export const setContentSize = (contentSize) => ({type: SET_CONTENT_SIZE, contentSize})
export const setFileName = (fileName) => ({type: SET_FILE_NAME, fileName})
export const setTime = (time) => ({type: SET_TIME, time})
export const setPrice = (price) => ({type: SET_PRICE, price})