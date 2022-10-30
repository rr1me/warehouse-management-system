export const makeCloseEvent = (id, setOpen) => {
    const closeDP = (e) => {
        console.log(e.composedPath())
        if (e.composedPath()[2].id !== id){
            setOpen(false);
        }
    };

    document.body.addEventListener('click', closeDP);

    return () => document.body.removeEventListener('click', closeDP);
}