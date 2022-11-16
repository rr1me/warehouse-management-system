import './RelativeModal.sass'
import {memo, useEffect, useRef, useState} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, children, id, modalStyle, itemClassname, setOpen, upwardModal, stopPropagation}) => {
    
    const modalRef = useRef();
    
    const [height, setHeight] = useState();
    
    useEffect(() => {
        if (setOpen) {
            makeCloseEvent(id, setOpen);
        }
        if (modalRef.current)
            setHeight(upwardModal ? modalRef.current.getBoundingClientRect().height : false);
    });
    
    const getStyle = () => {
        if (!modalStyle) return null;
        console.log(height);
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        console.log(top);
        let newVar = {...modalStyle, top: top};
        console.log(newVar);
        return newVar;
    }

    const onClick = e => stopPropagation ? e.stopPropagation() : null;
    
    if (state) return (
            <div style={{position: 'relative'}} id={id} onClick={onClick}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
                    {height !== undefined ? children : null}
                </div>
            </div>
        )
});

export default RelativeModal;