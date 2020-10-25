import React, {memo} from 'react';
import style from "./FirstSection.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setContent} from "../../../redux/orderReducer";

function FirstSection({addFile, resetFile}) {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.order)

    const textAreaHandler = (e) => {
        dispatch(setContent({
            text: e.target.value,
            length: e.target.value.length,
            fileName: ''
        }))
    }

    return (
        <div className={style.container}>
            <div>
                <h3>ORDER AN EDITING</h3>
                <p>We will correct all mistakes, remove all nonsense, bad sentences, but but we won't rewrite the text
                    too much. There will be no unnecessary fixes. <a href={'#about'}>More about editing</a>
                </p>
                <div className={style.requiredField}>
                    <input type="email" placeholder={'Your email'} required={true}/>
                </div>
                <input type="text" placeholder={"Your name"}/>
                <div className={style.inputData}>
                    {orderState.content.fileName ?
                        <div className={style.selectedFile}>
                            <div>{orderState.content.fileName}</div>
                            <div>Characters amount: {orderState.content.length}</div>
                            <div onClick={resetFile}>upload file</div>
                        </div> :
                        <textarea value={orderState.content.text} placeholder={'Enter text or'}
                                  onChange={e => textAreaHandler(e)}
                        />
                    }
                    <div
                        className={style.contentLength}>{orderState.content.length ? orderState.content.length : null}
                    </div>
                    <label style={orderState.content.length > 0 ? {display: 'none'} : {display: 'inline-block'}}
                           htmlFor="file_upload">upload file
                        <input id="file_upload" type="file" onChange={e => addFile(e)} accept={'.doc, .docx, ' +
                        'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, ' +
                        '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, ' +
                        'application/vnd.ms-excel,application/msword, application/vnd.ms-excel, ' +
                        'application/vnd.ms-powerpoint, text/plain, application/pdf, .rtf, .txt, .pdf, .zip'}
                        />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default memo(FirstSection)