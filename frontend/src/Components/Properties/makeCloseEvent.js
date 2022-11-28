export const makeCloseEvent = (id, setOpen, elemIndex=2) => {
    const closeDP = e => e.composedPath()[elemIndex].id !== id ? setOpen(false) : null;
    document.body.addEventListener('click', closeDP);
    return () => document.body.removeEventListener('click', closeDP);
};