import './RelativeModal.css'
import {memo, useRef} from "react";
import {useEffect} from "react";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const RelativeModal = memo(({state, doubleWrap, children, id, modalStyle, itemClassname, onClick, setOpen, newLogic, newLogicRef}) => {

    const modalRef = useRef();
    
    useEffect(() => {
        if (setOpen) {
            makeCloseEvent(id, setOpen);
        }

    });
    // let crds;
    // if (newLogicRef){
    //     const current = newLogicRef.current;
    //     if (!current) return;
    //     crds = current.getBoundingClientRect();
    //     console.log(modalRef.current.getBoundingClientRect());
    //d
    // }
    console.log(modalRef.current);
    if (state){
        return (
            <div className={'trying'} ref={modalRef} style={{top: '-' + (modalRef.current ? modalRef.current.getBoundingClientRect().height : '0') + 'px', left: (newLogicRef.current ? newLogicRef.current.getBoundingClientRect().x : '0') + 'px'}}>
                {/*{newLogic */}
                {/*    */}
                {/*    ? doubleWrap ? (children.length > 1 ? children.map((value, index) => {*/}
                {/*            return (*/}
                {/*                <div key={index} className={itemClassname}>*/}
                {/*                    {value}*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        }) : <div className={itemClassname}>{children}</div>) : children */}
                {/*    */}
                {/*:*/}
                {/*    */}
                {/*    <div id={id} className='relativeModal' style={modalStyle} onClick={onClick}>*/}
                {/*        {doubleWrap ? (children.length > 1 ? children.map((value, index) => {*/}
                {/*            return (*/}
                {/*                <div key={index} className={itemClassname}>*/}
                {/*                    {value}*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        }) : <div className={itemClassname}>{children}</div>) : children}*/}
                {/*    </div>*/}
                {/*}*/}
                <div>d</div>
                <div>d</div>
                <div>d</div>
            </div>
        )
    }
});

export default RelativeModal;