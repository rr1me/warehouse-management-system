import './RelativeModal.css'
import {memo, useRef, useState} from "react";
import {useEffect} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen, newLogic, newLogicRef}) => {

    const modalRef = useRef();
    
    const [height, setHeight] = useState();
    const [left, setLeft] = useState((newLogicRef && newLogicRef.current) ? newLogicRef.current.offsetLeft : 0);
    useEffect(() => {
        if (setOpen) {
            makeCloseEvent(id, setOpen);
        }
        if (modalRef.current) setHeight(modalRef.current.getBoundingClientRect().height);
        
        
    });
    
    const getHeight = () => {
        console.log(modalRef);
        return -height;
    }
    
    if (state){
        return (
            <div style={{position: 'relative'}} ref={modalRef}>
                <div className={'trying'} style={{top: getHeight() + 'px', left: left + 'px'}}>
                    {newLogic

                        ? doubleWrap ? (children.length > 1 ? children.map((value, index) => {
                            return (
                                <div key={index} className={itemClassname}>
                                    {value}
                                </div>
                            )
                        }) : <div className={itemClassname}>{children}</div>) : children

                        :

                        <div id={id} className='relativeModal' style={modalStyle} onClick={onClick}>
                            {doubleWrap ? (children.length > 1 ? children.map((value, index) => {
                                return (
                                    <div key={index} className={itemClassname}>
                                        {value}
                                    </div>
                                )
                            }) : <div className={itemClassname}>{children}</div>) : children}
                        </div>
                    }
                </div>
            </div>
        )
    }
});

export default RelativeModal;