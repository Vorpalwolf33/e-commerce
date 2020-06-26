export default (state = null, action) => {
    switch(action.type) {
        case "SET_CART":
            state = action.payload;
            break;
        case "RESET_CART":
            state = null;
            break;
        default: break;
    }
    return state;
}