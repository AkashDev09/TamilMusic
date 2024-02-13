import { DURATION, INCREMENTVALUE, INTREVAL, ISPLAYING, SONGSVALUE } from "./actionType";
const intitalState = {
    Songs: [],
    selectItem: {},
    interval: 0,
    isPlaying: false,
    duration: 0
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
            break
        case DURATION:
            state = {
                ...state,
                duration: action.payload
            };
            break
        case INTREVAL:
            state = {
                ...state, interval: action.payload
            }
            break
        case ISPLAYING:
            state = {
                ...state, isPlaying: action.payload
            }
        default:
            state = { ...state };
            break;
    }
    return state;
};
export default reducer;