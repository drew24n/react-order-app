import React from 'react';
import {Input} from "./Input/Input";
import {Language} from "./Language/Language";
import {Comment} from "./Comment/Comment";

export const OrderForm = ({processFile, resetFile}) => {
    return (
        <div>
            <Input processFile={processFile} resetFile={resetFile}/>
            <Language/>
            <Comment/>
        </div>
    )
}