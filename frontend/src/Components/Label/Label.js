import './Label.sass';
import {memo} from "react";

const Label = memo(({list, value}) => {
    const color = list[value].clr;
    
    return (
        <div className={'label ' + color}>
            {list[value].text}
        </div>
    )
});

export default Label;