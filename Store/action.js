import { INCREMENTVALUE } from "./actionType"

export const SelectItem = (access) => {
    return {
        type: INCREMENTVALUE,
        payload: { ...access },
    }
}