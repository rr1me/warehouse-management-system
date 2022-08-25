import './TransitCargoRow.css';

const TransitCargoRow = ({current}) => {
    return (
        <>
            <div className='transitCargoRow'>{current.id}</div>
            <div className='transitCargoRow'>{current.stickerId}</div>
            <div className='transitCargoRow'>{current.innerWorks}</div>
            <div className='transitCargoRow'>{current.description}</div>
        </>
    )
};

export default TransitCargoRow;