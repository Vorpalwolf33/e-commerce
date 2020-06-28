export default (state = null, action) => {
    switch(action.type) {
        case "SET_ORDERS": 
            state = action.payload;
            break;
        case "RESET_ORDERS":
            state = null;
            break;
        default: break;
    }
    return state;
}