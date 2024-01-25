import { INCREMENTVALUE, SONGSVALUE } from "./actionType";
const intitalState = {
    Songs: [],
    selectItem: {}
}


function reducer(state = intitalState, action) {

    switch (action.type) {
        case INCREMENTVALUE:
            state = {
                ...state,
                selectItem: { ...action.payload }
            };
            break;
        case SONGSVALUE:
            state = {
                ...state,
                Songs: action.payload
            };
        default:
            state = { ...state };
            break;
    }
    return state;
};
export default reducer;