export const makeCloseEvent = (id, setOpen) => {
    const closeDP = (e) => {
        if (e.composedPath()[0].id !== id){
            setOpen(false);
        }
    };

    document.body.addEventListener('click', closeDP);

    return () => document.body.removeEventListener('click', closeDP);
}