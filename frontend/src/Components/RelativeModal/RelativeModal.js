import './RelativeModal.sass'
import {useEffect, useRef, useState} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";
import SimpleBar from "simplebar-react";

const RelativeModal = ({state, children, id, modalStyle, setOpen, upwardModal, stopPropagation}) => {

    const modalRef = useRef();
    const contentRef = useRef();
    
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();

    useEffect(() => {
        let closeReturnEvent
        if (setOpen && state)
            closeReturnEvent = makeCloseEvent(id, setOpen);

        if (modalRef.current)
            setHeight(upwardModal ? modalRef.current.getBoundingClientRect().height : false);

        if (contentRef.current && (modalStyle.height || modalStyle.maxHeight) && (modalStyle && !modalStyle.width))
            setWidth(contentRef.current.children[0].getBoundingClientRect().width);
        else if (modalStyle && modalStyle.width)
            setWidth(modalStyle.width);

        return closeReturnEvent
    });
    
    const getStyle = () => {
        if (!modalStyle) return null;
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        return {...modalStyle, top: top, width: width};
    }

    const onClick = e => stopPropagation ? e.stopPropagation() : null;
    
    if (state) return (
            <div style={{position: 'relative'}} id={id} onClick={onClick}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
                    {height !== undefined ? <WrappedOrNot modalStyle={modalStyle} children={children} contentRef={contentRef}/> : null}
                </div>
            </div>
        )
};

const WrappedOrNot = ({modalStyle, children, contentRef}) =>
    !(modalStyle.height || modalStyle.maxHeight) ? children :
    <SimpleBar style={{height: 'inherit', maxHeight: 'inherit'}}>
        <div ref={contentRef}>
            {children}
        </div>
    </SimpleBar>

export default RelativeModal;