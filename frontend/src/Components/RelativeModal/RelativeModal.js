import './RelativeModal.sass'
import {memo, useEffect, useRef, useState} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen, upwardModal}) => {

    const modalRef = useRef();
    console.log(modalStyle);
    const [height, setHeight] = useState();
    useEffect(() => {
        if (setOpen) {
            makeCloseEvent(id, setOpen);
        }
        if (modalRef.current)
            setHeight(upwardModal ? modalRef.current.getBoundingClientRect().height : false);
    });
    
    const getStyle = () => {
        console.log("?");
        const top = (height ? -(height + modalStyle.top) : modalStyle.top/2);
        const style = {...modalStyle, top: top};
        console.log(style);
        return style;
    }
    
    if (state) return (
            <div style={{position: 'relative'}}>
                <div className='absoluteModal' ref={modalRef} style={getStyle()}>
                    {/*{doubleWrap ? (children.length > 1 ? children.map((value, index) => {*/}
                    {/*    return (*/}
                    {/*        <div key={index} className={itemClassname}>*/}
                    {/*            {value}*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*}) : <div className={itemClassname}>{children}</div>) : children}*/}
                    {height !== undefined ?
                        (doubleWrap ? (children.length > 1 ? children.map((value, index) => {
                            return (
                                <div key={index} className={itemClassname}>
                                    {value}
                                </div>
                            )
                        }) : <div className={itemClassname}>{children}</div>) : children)
                        : null
                    }
                </div>
            </div>
        )
});

export default RelativeModal;