// import './RelativeModal.css'
import './RelativeModal.sass'
import {memo, useRef, useState} from "react";
import {useEffect} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen, upwardModal}) => {

    const modalRef = useRef();
    console.log(modalStyle);
    const [height, setHeight] = useState();
    useEffect(() => {
        if (setOpen) {
            makeCloseEvent(id, setOpen);
        }
        if (modalRef.current && upwardModal) {
            console.log("WHAT");
            setHeight(modalRef.current.getBoundingClientRect().height)
        }
        console.log('upd'); 
    });
    
    const getStyle = () => {
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        const style = {...modalStyle, top: top};
        console.log(style);
        return style;
    }
    
    if (state){
        return (
            <div style={{position: 'relative'}}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
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