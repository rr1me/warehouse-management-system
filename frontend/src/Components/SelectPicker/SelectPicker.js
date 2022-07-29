import './SelectPicker.css';
import {MdOutlineHorizontalRule} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {memo, useMemo, useRef, useState} from "react";
import RelativeModal from "../RelativeModal/RelativeModal";

const SelectPicker = memo(({children, defaultValue}) => {
    
    const icons = useMemo(() => {
        return (
            {
                separator: <MdOutlineHorizontalRule/>,
                arrow: <IoIosArrowDown/>
            }
        )
    }, []);

    console.log(children);
    
    // useEffect(() => {
    //     children = children.map(value => {
    //         value.props.className += ' SPChildren'
    //     })
    // })
    // const childrenRef = useRef(children)
    // console.log(childrenRef);
    
    const [open, setOpen] = useState(false);
    
    const selectPickerRef = useRef();
    
    const closingElement = () => {
        return (
            <div className='closingElement' onClick={() => {setOpen(false)}}></div>
        )
    }
    
    return (
        <div className='devContainer'>
            {open ? closingElement() : null}
            <div className='selectPicker' onClick={() => {setOpen(value => !value)}} ref={selectPickerRef}>
                <div className='selectPickerContent'>
                    {/*{defaultValue}*/}
                    children
                    {open ? <RelativeModal width={selectPickerRef.current.offsetWidth}>
                        <div>children</div>
                        <div>children</div>
                        <div>children</div>
                        <div>children</div>
                    </RelativeModal> : null}
                </div>
                <div className='separator'>
                    {icons.separator}
                </div>
                <div className={'controls'+(open ? ' dark': ' bright')}>
                    {icons.arrow}
                </div>
            </div>
        </div>
    )
});

export default SelectPicker;