import {memo} from "react";

const Editable = memo(({state, children}) => {
    const value = children.props.value;
    return (
        <>
            {state ? children : value}
        </>
    )
});

export default Editable;