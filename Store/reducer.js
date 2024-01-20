import { INCREMENTVALUE } from "./actionType";
import Songs from "../pages/Data/Songs.json"

const intitalState = {
    Songs: Songs.station.map((x, i) => ({ ...x, Id: i + 1 })),
    selectItem: {}

}


function reducer(state = intitalState, action) {

    switch (action.type) {
        case INCREMENTVALUE:
            state = {
                ...state,
                selectItem: { ...action.payload }
            };
        default:
            return state
    }
}
export default reducer;