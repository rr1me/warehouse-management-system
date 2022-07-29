const Editable = ({state, children}) => {
    const value = children.props.value;
    return (
        <>
            {state ? children : value}
        </>
    )
};

export default Editable;