export default (state = null, action) => {
    switch(action.type) {
        case "SET_USER": 
            state = action.payload;
            break;
        case "RESET_USER": 
            state = null;
            break;
        default: break;
    }
    return state;
}