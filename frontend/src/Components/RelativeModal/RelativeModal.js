import './RelativeModal.sass'
import {memo, useEffect, useRef, useState} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, children, id, modalStyle, itemClassname, setOpen, upwardModal}) => {
    
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
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        return {...modalStyle, top: top};   
    }
    
    if (state) return (
            <div style={{position: 'relative'}} id={id}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
                    {height !== undefined ? children : null}
                </div>
            </div>
        )
});

export default RelativeModal;