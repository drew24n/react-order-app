import React, {memo} from 'react';
import style from "./ThirdSection.module.scss";

function ThirdSection() {
    return (
        <div className={style.container}>
            <div>
                <input type="text" placeholder={'Short comment or link'}/>
            </div>
        </div>
    )
}

export default memo(ThirdSection)