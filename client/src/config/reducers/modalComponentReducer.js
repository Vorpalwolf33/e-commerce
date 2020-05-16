export default (state = null, action) => {
    switch(action.type) {
        case "SET_MODAL_COMPONENT": 
            state = action.payload;
            break;
        case "RESET_MODAL_COMPONENT": 
            state = null;
            break;
        default: 
            break;
    }
    return state;
}   