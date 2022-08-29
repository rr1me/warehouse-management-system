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
            {/*{isError ? errorMessage : null}*/}
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