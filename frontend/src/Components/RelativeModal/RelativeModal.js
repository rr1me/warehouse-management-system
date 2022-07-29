import './RelativeModal.css'
import {memo} from "react";

const RelativeModal = memo(({children, id}) => {
    return (
        <div id={id} className='absolute'>
            <div className='relativeModal'>
                {children.map((value, index) => {
                    return (
                        <div key={index}>
                            {value}
                        </div>
                    )
                })}
            </div>
        </div>
    )
});

export default RelativeModal;