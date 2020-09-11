import React from 'react';
import style from "./Comment.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setComment} from "../../../redux/appReducer";

export const Comment = () => {
    let dispatch = useDispatch()
    let appState = useSelector(state => state.app)

    return (
        <div className={style.container}>
            <div>
                <input value={appState.comment} onChange={e => dispatch(setComment(e.target.value))} type="text"
                       placeholder={'Короткий комментарий или ссылка'}/>
            </div>
        </div>
    )
}