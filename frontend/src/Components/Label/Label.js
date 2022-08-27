import './Label.sass';

const Label = ({list, value}) => {
    
    const color = list[value].clr;
    
    return (
        <div className={'label ' + color}>
            {list[value].text}
        </div>
    )
};

export default Label;