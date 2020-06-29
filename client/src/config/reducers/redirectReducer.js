export default (state = null, action) => {
    switch(action.type) {
        case "SET_REDIRECT":
            state = action.payload;
            break;
        case "RESET_REDIRECT":
            state = null;
            break;
        default: break;
    }
    return state;
}