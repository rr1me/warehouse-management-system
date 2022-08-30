import './RelativeModal.css'
import {memo} from "react";
import {useEffect} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen}) => {

    useEffect(() => {
        if (setOpen)
            makeCloseEvent(id, setOpen);
    });
    
    if (state){ // todo dig into onlyAbsolute modal, cuz anims behind absolute didnt work, even after margin/padding relative part. + some problems with positioning in 'display grid'
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