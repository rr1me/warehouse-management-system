import './SelectPicker.css';
import {MdOutlineHorizontalRule} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {memo, useEffect, useMemo, useRef, useState} from "react";
import RelativeModal from "../RelativeModal/RelativeModal";

const SelectPicker = memo(({children, defaultValue, id, customStyle, activeStyle, readOnly}) => {
    
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

    const spRef = useRef(false);
    
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        if (spRef.current && open)
            setOpen(false);
    }, [readOnly]);

    useEffect(() => {
        if (!readOnly){
            const closeDP = (e) => {
                if (e.composedPath()[0].id !== id){
                    setOpen(false);
                }
            };

            document.body.addEventListener('click', closeDP);

            return () => document.body.removeEventListener('click', closeDP);
        }
        spRef.current = true;
    });
    
    const selectPickerRef = useRef();
    
    const handleSPClick = e => {
        e.stopPropagation();
        setOpen(value => {
            if (!readOnly)
                return !value;
        })
    }
    
    const getStyle = () => {
        if (activeStyle && open)
            return activeStyle;
        if (customStyle)
            return customStyle;
        return 'selectPickerStyle';
    }
    
    return (
        <div className={'selectPicker '+(getStyle())} onClick={handleSPClick} ref={selectPickerRef}>
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