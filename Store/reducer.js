import { DURATION, INCREMENTVALUE, INTREVAL, ISPLAYING, SONGSVALUE, THUMBNAIL } from "./actionType";
const intitalState = {
    Songs: [],
    selectItem: {},
    interval: 0,
    isPlaying: false,
    duration: 0,
    thumbnailUri: ""
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
            break
        case THUMBNAIL:
            state = {
                ...state, thumbnailUri: action.payload
            }
        default:
            state = { ...state };
            break;
    }
    return state;
};
export default reducer;