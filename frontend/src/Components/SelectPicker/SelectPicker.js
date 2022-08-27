import './SelectPicker.sass';
import {MdOutlineHorizontalRule} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {memo, useEffect, useMemo, useRef, useState} from "react";
import RelativeModal from "../RelativeModal/RelativeModal";
import {useDispatch} from "react-redux";

const SelectPicker = memo(({children, defaultValue, id, customStyle, activeStyle, readOnly, reducer}) => {
    
    const icons = useMemo(() => {
        return (
            {
                separator: <MdOutlineHorizontalRule/>,
                arrow: <IoIosArrowDown/>
            }
        )
    }, []);

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
    };
    
    const getStyle = () => {
        if (activeStyle && open)
            return activeStyle;
        if (customStyle)
            return customStyle;
        return 'style';
    };
    
    const dispatch = useDispatch();
    
    const handleSPContentClick = index => {
        // console.log(index);
        dispatch(reducer(index));
    };
    
    return (
        <div className={'selectPicker '+(getStyle())} onClick={handleSPClick} ref={selectPickerRef}>
            <div className='content'>
                {children[defaultValue]}
                <RelativeModal state={open}
                               modalStyle={{width: (selectPickerRef.current !== undefined ? selectPickerRef.current.offsetWidth-2+'px' : null), right: '10px', top: '15px'}}
                               doubleWrap={false}>
                    {children.map((value, index) => {
                        return (
                            <div className='item' onClick={() => handleSPContentClick(index)} key={index}>
                                {value}
                            </div>
                        )
                    })}
                </RelativeModal>
            </div>
            <div className='controls'>
                <div className='separator'>
                    {icons.separator}
                </div>
                <div className={'arrow'+(open ? ' dark' : ' bright')}>
                    {icons.arrow}
                </div>
            </div>
        </div>
    )
});

export default SelectPicker;