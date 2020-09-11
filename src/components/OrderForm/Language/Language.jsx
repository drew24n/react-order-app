import React from 'react';
import style from "./Language.module.scss";
import {useDispatch} from "react-redux";
import {setLang} from "../../../redux/appReducer";

export const Language = () => {
    let dispatch = useDispatch()
    let languages = ['Украинский', 'Русский', 'Английский']

    return (
        <div className={style.container}>
            <div>
                <h3>ЯЗЫК</h3>
                <div className={style.languages}>
                    {languages.map((l, index) => (
                        <div key={index}>
                            <label htmlFor={l}>
                                <input type="radio" name={'lang'} value={l} id={l}
                                       onChange={e => dispatch(setLang(e.target.value))}/>
                                <div/>
                                <span/>
                                {l}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}