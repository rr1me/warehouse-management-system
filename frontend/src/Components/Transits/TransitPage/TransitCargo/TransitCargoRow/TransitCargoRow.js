import './TransitCargoRow.css';
import Valid from "../../../../Valid/Valid";

const TransitCargoRow = ({current, trCargoStickerIdValid}) => {
    return (
        <>
            <div className='transitCargoRow'>{current.id}</div>
            <div className='transitCargoRow'>
                <Valid valid={trCargoStickerIdValid} errorMessage='Sticker id cant be null'>
                    {current.stickerId}
                </Valid>
            </div>
            {/*<div className='transitCargoRow'>{current.innerWorks}</div>*/}
            <div className='transitCargoRow'>{current.description}</div>
            <div className='transitCargoRow'>
                <button>edit</button>
                <button>delete</button>
            </div>
        </>
    )
};

export default TransitCargoRow;