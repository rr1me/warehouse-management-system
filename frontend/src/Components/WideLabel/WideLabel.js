import './WideLabel.sass';

const WideLabel = ({children, clickable, onClick}) => { //todo clickable?
    return (
        <div className={'wideLabel' + (clickable ? ' clickable' : '')} onClick={onClick}>
            {children}
        </div>
    )
};

export const WideLabelItem = ({name, width, children}) => {
    return (
        <div className='wliItem'>
            <div className='wliName'>{name}</div>
            <div className='wliParam' style={{width: width}}>{children}</div>
        </div>
    )
}

export default WideLabel;