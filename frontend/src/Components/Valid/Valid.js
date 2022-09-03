import './Valid.sass';

const Valid = ({children, valid, errorMessage, upperError}) => {
    
    const Error = () => {
        return (
            <div className='validError'>
                • {errorMessage}
            </div>
        )
    };
    
    return (
        <>
            {upperError ? 
                <>
                    {!valid ? <Error/> : null}
                    {children}
                </> 
                : 
                <>
                    {children}
                    {!valid ? <Error/> : null}
                </>
            }
        </>
    )
};

export default Valid;