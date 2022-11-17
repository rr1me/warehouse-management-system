import './RelativeModal.sass'
import {memo, useEffect, useRef, useState} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";
import SimpleBar from "simplebar-react";

const RelativeModal = memo(({state, children, id, modalStyle, itemClassname, setOpen, upwardModal, stopPropagation}) => {
    
    const modalRef = useRef();
    const contentRef = useRef();
    
    const [height, setHeight] = useState();
    const [width, setWidth] = useState((modalStyle && modalStyle.width) ? modalStyle.width : 'auto');
    
    useEffect(() => {
        if (setOpen)
            makeCloseEvent(id, setOpen);

        if (modalRef.current)
            setHeight(upwardModal ? modalRef.current.getBoundingClientRect().height : false);

        if (contentRef.current && (modalStyle.height || modalStyle.maxHeight) && !modalStyle.width)
            setWidth(contentRef.current.children[0].getBoundingClientRect().width);
    });
    
    const getStyle = () => {
        if (!modalStyle) return null;
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        return {...modalStyle, top: top, width: width};
    }

    const onClick = e => stopPropagation ? e.stopPropagation() : null;

    const WrappedOrNot = () => {
        return !(modalStyle.height || modalStyle.maxHeight) ? children :
            <SimpleBar style={{height: 'inherit', maxHeight: 'inherit'}}>
                <div ref={contentRef}>
                    {children}
                </div>
            </SimpleBar>
    }
    
    if (state) return (
            <div style={{position: 'relative'}} id={id} onClick={onClick}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
                    {height !== undefined ? <WrappedOrNot/> : null}
                </div>
            </div>
        )
});

export default RelativeModal;