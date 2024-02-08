import { BOTTOUMPLAY, INCREMENTVALUE, SONGSVALUE } from "./actionType"

export const SelectItem = (access) => {
    return {
        type: INCREMENTVALUE,
        payload: { ...access },
    }
}

export const SongsLists = (access) => {
    return {
        type: SONGSVALUE,
        payload: access,
    }
}
export const bottomPlay = (access) => {
    return {
        type: BOTTOUMPLAY,
        payload: access,
    }
}