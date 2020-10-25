import React, {memo} from 'react';
import style from "./SecondSection.module.scss";
import {useDispatch} from "react-redux";
import {setLang} from "../../../redux/orderReducer";

function SecondSection() {
    const dispatch = useDispatch()
    const languages = ['Ukrainian', 'Russian', 'English']

    return (
        <div className={style.container}>
            <div>
                <h3>Language</h3>
                <div className={style.languages}>
                    {languages.map((lang, index) => (
                        <React.Fragment key={index}>
                            <label htmlFor={lang}>
                                <input type="radio" name={'lang'} value={lang} id={lang}
                                       onChange={e => dispatch(setLang(e.target.value))}
                                />
                                <div/>
                                <span/>
                                {lang}
                            </label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(SecondSection)