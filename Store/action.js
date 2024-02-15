import { DURATION, INCREMENTVALUE, INTREVAL, ISPLAYING, SONGSVALUE, THUMBNAIL } from "./actionType"

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
export const durations = (access) => {
    return {
        type: DURATION,
        payload: access,
    }
}
export const interval = (access) => {
    return {
        type: INTREVAL,
        payload: access
    }
}
export const isPlayings = (access) => {
    return {
        type: ISPLAYING,
        payload: access
    }
}
export const thumbnailImageUri = (access) => {
    return {
        type: THUMBNAIL,
        payload: access
    }
}