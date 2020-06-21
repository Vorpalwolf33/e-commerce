export default  (state = null, action) => {
    switch(action.type) {
        case "SET_PRODUCT": 
            state = action.payload;
            break;
        case "RESET_PRODUCT":
            state = null;
            break;
        default: break;
    }
    return state;
}