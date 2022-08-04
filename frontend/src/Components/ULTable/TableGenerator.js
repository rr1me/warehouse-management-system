import './ULTable.css'

const GenerateTable = ({headerValues, rowFunctions, array}) => {

    const rowValues = Object.values(array).map((value, index) => {
        return rowFunctions.map((value2, index2) => {
            const arrayVariable = Object.values(Object.values(value)[0])[index2+1];
            return arrayVariable !== undefined ? value2(arrayVariable, index) : value2(index);
        })
    });
    
    const headerValuesLength = headerValues.length;
    const rowValuesLength = rowValues[0]?.length;
    
    const getClassName = (index, length) => {
        let className='col';
        if (index !== length-1)
            className += ' col-start'
        else
            className += ' col-end'
        
        return className;
    };
    
    return (
        <div className='container'>
            <ul className='responsive-table'>
                <li className='table-header'>
                    {headerValues.map((value, index) => {
                        return (
                            <div key={index} className={getClassName(index, headerValuesLength)}>{value}</div>
                        )
                    })}
                </li>
                {rowValues.map((value,index) => {
                    return (
                        <li key={index} className='table-row'>
                            {value.map((value2, index2) => {
                                return (
                                    <div key={index2} className={getClassName(index2, rowValuesLength)}>{value2}</div>
                                )
                            })}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default GenerateTable;