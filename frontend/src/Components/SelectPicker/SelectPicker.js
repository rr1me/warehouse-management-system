import './SelectPicker.sass';
import {MdOutlineHorizontalRule} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {memo, useEffect, useMemo, useRef, useState} from "react";
import RelativeModal from "../RelativeModal/RelativeModal";
import {useDispatch} from "react-redux";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const SelectPicker = memo(({children, defaultValue, id, customStyle, activeStyle, openStyle, readOnly, reducer, upwardModal, customControls}) => {
    
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
        if (!readOnly)
            makeCloseEvent(id, setOpen);
        spRef.current = true;
    });
    
    const selectPickerRef = useRef();
    
    const handleSPClick = e => {
        e.stopPropagation();
        setOpen(value => {
            // if (!readOnly)
            //     return !value;
            return !readOnly ? !value : null;
        })
    };
    
    // const getStyle = () => {
    //     if (openStyle && open)
    //         return openStyle;
    //     if (customStyle)
    //         return customStyle;
    //     return 'style';
    // };
    
    const getStyle = () => {
        let style = customStyle ? customStyle : 'selectPicker';
        if (readOnly) style += ' readonly'
        else if (openStyle && open) style += ' '+openStyle;
        else if(activeStyle && !readOnly) style += ' '+activeStyle;
        return style;
    }
    
    const dispatch = useDispatch();
    
    const handleSPContentClick = index => {
        dispatch(reducer(index));
    };
    
    const modalOrientation = () => {
        let orientation;
        if (upwardModal){
            const crds = selectPickerRef.current.getBoundingClientRect().height;
            console.log(crds);
        }
        return '-93px';
    }
    
    return (
        <div className={getStyle()} onClick={handleSPClick} ref={selectPickerRef}>
            <div className='content'>
                {children[defaultValue]}
                <RelativeModal state={open}
                               modalStyle={{width: (selectPickerRef.current !== undefined ? selectPickerRef.current.offsetWidth-2+'px' : null), right: '10px', top: '15px'}}
                               doubleWrap={false} newLogic={true} newLogicRef={selectPickerRef}>
                    {children.map((value, index) => {
                        return (
                            <div className='item' onClick={() => handleSPContentClick(index)} key={index}>
                                {value}
                            </div>
                        )
                    })}
                </RelativeModal>
            </div>
            {customControls ? customControls 
            :
                <div className='controls'>
                    <div className='separator'>
                        {icons.separator}
                    </div>
                    <div className={'arrow'+(open ? ' dark' : ' bright')}>
                        {icons.arrow}
                    </div>
                </div>
            }
        </div>
    )
});

export default SelectPicker;