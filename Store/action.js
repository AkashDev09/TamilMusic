import { DURATION, ADDFAVORITE, INCREMENTVALUE, INTREVAL, ISPLAYING, SONGSVALUE, THUMBNAIL, REMOVEFAVORITE, RESTOREFAVORITE } from "./actionType"

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
export const favoriteAdd = (access) => {
    return {
        type: ADDFAVORITE,
        payload:  access 
    }
}
export const favoriteRemove = (access) => {
    return {
        type: REMOVEFAVORITE,
        payload: access
    }
}
export const RestoreFavorite = (access) => {
    return {
        type: RESTOREFAVORITE,
        payload: access
    }
}