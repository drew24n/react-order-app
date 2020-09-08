const SET_LANG = "SET_LANG"
const SET_TEXT = "SET_TEXT"
const SET_EMAIL = "SET_EMAIL"
const SET_NAME = "SET_NAME"
const SET_COMMENT = "SET_COMMENT"

const initialState = {
    currentLang: '',
    text: '',
    email: '',
    name: '',
    comment: ''
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANG:
            return {...state, currentLang: action.lang}
        case SET_TEXT:
            return {...state, text: action.text}
        case SET_EMAIL:
            return {...state, email: action.email}
        case SET_NAME:
            return {...state, name: action.name}
        case SET_COMMENT:
            return {...state, comment: action.comment}
        default:
            return state
    }
}

export const setLang = (lang) => ({type: SET_LANG, lang})
export const setText = (text) => ({type: SET_TEXT, text})
export const setEmail = (email) => ({type: SET_EMAIL, email})
export const setName = (name) => ({type: SET_NAME, name})
export const setComment = (comment) => ({type: SET_COMMENT, comment})