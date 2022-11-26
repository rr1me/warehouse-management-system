import './SelectPicker.sass';
import {MdOutlineHorizontalRule} from "react-icons/md";
import {IoIosArrowDown} from "react-icons/io";
import {memo, useEffect, useMemo, useRef, useState} from "react";
import RelativeModal from "../RelativeModal/RelativeModal";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

const SelectPicker = ({children, defaultValue, id, customStyle, activeStyle, openStyle, readOnly, setValue, upwardModal, customControls}) => {

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
    
    useEffect(() => { //todo why there is custom logic? try to remake
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
            return !readOnly ? !value : null;
        })
    };
    
    const getStyle = () => {
        let style = customStyle ? customStyle : 'selectPicker';
        if (readOnly) style += ' readonly'
        else if (openStyle && open) style += ' '+openStyle;
        else if(activeStyle && !readOnly) style += ' '+activeStyle;
        return style;
    }
    
    const handleSPContentClick = index => setValue(index)
    
    const getModalStyle = () => {
        if (!selectPickerRef.current) return null;
        
        const top = selectPickerRef.current.offsetHeight;
        const width = selectPickerRef.current.offsetWidth;
        const newVar = {width: (!customStyle ? width-1 : width), top: (!customStyle ? top-5 : top), left: (!customStyle ? -10 : -7)};
        return newVar
    }

    return (
        <div className={getStyle()} onClick={handleSPClick} ref={selectPickerRef}>
            <div className='content'>
                {children[defaultValue]}
                <RelativeModal state={open}
                               id={id}
                               modalStyle={getModalStyle()}
                               upwardModal={upwardModal}>
                    {children.map((value, index) => {
                        return (
                            <div className='spItem' onClick={() => handleSPContentClick(index)} key={index}>
                                {value}
                            </div>
                        )
                    })}
                </RelativeModal>
            </div>
            <Controls customControls={customControls} icons={icons} open={open}/>
        </div>
    )
};

const Controls = ({customControls, icons, open}) => {
    if (customControls === 'none') return null;
    return customControls ? customControls
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

export default SelectPicker;