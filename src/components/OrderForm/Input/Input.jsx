import React from 'react';
import style from "./Input.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setName, setText} from "../../../redux/appReducer";

export const Input = ({processFile, resetFile}) => {
    let dispatch = useDispatch()
    let appState = useSelector(state => state.app)

    return (
        <div className={style.container}>
            <div>
                <h3>ЗАКАЗ РЕДАКТИРОВАНИЯ</h3>
                <p>Исправим все ошибки и огрехи, уберем все глупости из текста, перефразируем неудачные места, но
                    сильно переписывать текст не станем. Лишних правок не будет.
                    <a href={'#about'}>Подробнее о редактировании</a>
                </p>
                <div className={style.requiredField}>
                    <input value={appState.email} onChange={e => dispatch(setEmail(e.target.value))} type="email"
                           placeholder={'Ваша эл. почта'} required={true}/>
                </div>
                <input value={appState.name} onChange={e => dispatch(setName(e.target.value))} type="text"
                       placeholder={'Ваше имя'}/>
                <div className={style.inputData}>
                    <div style={appState.fileName ? {display: 'flex'} : {display: 'none'}}
                         className={style.selectedFile}>
                        <div>{appState.fileName}</div>
                        <div>Количество символов: {appState.contentSize.toLocaleString()}</div>
                        <div onClick={resetFile}>загрузите файл</div>
                    </div>
                    <textarea style={appState.fileName ? {display: 'none'} : {display: 'inline-block'}}
                              value={appState.text} placeholder={'Введите текст или'}
                              onChange={e => dispatch(setText(e.target.value))}/>
                    <div className={style.contentLength}>{appState.contentSize && !appState.fileName
                        ? appState.contentSize.toLocaleString() : ''}</div>
                    <label style={appState.contentSize > 0 ? {display: 'none'} : {display: 'inline-block'}}
                           htmlFor="file_upload">загрузите файл
                        <input id="file_upload" type="file" onChange={e => processFile(e)} accept={'.doc, .docx, ' +
                        'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, ' +
                        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, ' +
                        'application/vnd.ms-excel,application/msword, application/vnd.ms-excel, ' +
                        'application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip'}/>
                    </label>
                </div>
            </div>
        </div>
    )
}