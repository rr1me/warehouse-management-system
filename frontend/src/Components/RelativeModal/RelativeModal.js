import './RelativeModal.css'
import {memo} from "react";

const RelativeModal = memo(({doubleWrap, children, id, modalStyle, itemClassname, onClick}) => {
    console.log(children)
    return (
        <div id={id} style={{position: 'absolute'}} onClick={onClick}>
            <div className='relativeModal' style={modalStyle}>
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
});

export default RelativeModal;