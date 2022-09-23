import './Error.sass';

const Error = ({errorMessage, state}) => {
    // console.log(states);
    
    // const Error = () => {
    //     return (
    //         <div className='validError'>
    //             • {errorMessage}
    //         </div>
    //     )
    // };
    
    if (state){
        return (
            <div className='error'>
                • {errorMessage}
            </div>
        )
    }
};

export default Error;