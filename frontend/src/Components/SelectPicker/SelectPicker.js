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
    
    // useEffect(() => {
    //     children = children.map(value => {
    //         value.props.className += ' SPChildren'
    //     })
    // })
    // const childrenRef = useRef(children)
    // console.log(childrenRef);
    
    const [open, setOpen] = useState(false);
    
    const selectPickerRef = useRef();
    
    return (
        <div className='selectPicker' onClick={() => {setOpen(value => !value)}} ref={selectPickerRef}>
            <div className='selectPickerContent'>
                {defaultValue}
                <RelativeModal state={open}
                               modalStyle={{width: (selectPickerRef.current !== undefined ? selectPickerRef.current.offsetWidth-22+'px' : null), right: '10px', top: '15px', padding: '5px 10px'}}
                               doubleWrap={false}>
                    {children}
                </RelativeModal>
            </div>
            <div className='spControls'>
                <div className='separator'>
                    {icons.separator}
                </div>
                <div className={'spArrow'+(open ? ' darkArr' : ' brightArr')}>
                    {icons.arrow}
                </div>
            </div>
        </div>
    )
});

export default SelectPicker;