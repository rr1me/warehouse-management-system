import './RelativeModal.css'
import {memo} from "react";
import {useEffect} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen}) => {

    useEffect(() => {
        if (setOpen)
            makeCloseEvent(id, setOpen);
    });
    
    if (state){
        return (
            <div style={{position: 'absolute'}}>
                <div id={id} className='relativeModal' style={modalStyle} onClick={onClick}>
                    {doubleWrap ? (children.length > 1 ? children.map((value, index) => {
                        return (
                            <div key={index} className={itemClassname}>
                                {value}
                            </div>
                        )
                    }) : <div className={itemClassname}>{children}</div>) : children}
                </div>
            </div>
        )
    }
});

export default RelativeModal;