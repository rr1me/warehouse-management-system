﻿import './BlueTable.css';
import './BTHard.css'
import './BTLight.css';

import './BlueTable.sass'

import {useNavigate} from "react-router-dom";

const BlueTable = ({header, children, gridTemplate, clickable, lightStyle}) => {
    
    const navigate = useNavigate()
    
    const handleRowClick = id => {
        navigate('/transits/'+id);
    }
    
    // const getStyle = elem => 'bt_'+(lightStyle ? 'light' : 'hard')+(elem ? '_' : '')+elem;
    const getStyle = () => (lightStyle ? 'light' : 'hard')
    
    const getRowStyle = isOdd => {
        let style = 'row '+getStyle();
        if (clickable) style += ' clickable';
        if (!lightStyle && isOdd) style += ' odd'
        return style += ' '+gridTemplate;
    };
    
    const getHeaderStyle = () => 'header ' + gridTemplate + ' ' + getStyle();
    
    console.log(children);
    
    return (
        <div className={'blueTable '+getStyle()}>
            <div className={getHeaderStyle()}>
                {header.map((value, index) => {
                    return (
                        <div className={'header item '+getStyle()} key={index}>
                            {value}
                        </div>
                    )
                })}
            </div>
            {children ? children.map((value, index) => {
                return (
                    <div className={getRowStyle(index % 2)} key={index} onClick={clickable ? () => handleRowClick(value.id) : null}>
                        {value.element}
                    </div>
                )
            }) : null}
        </div>
    )
};

export default BlueTable;