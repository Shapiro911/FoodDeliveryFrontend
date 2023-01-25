import { ActionType } from "./actionTypes"

export const changeDeliveryDetailsVisibility = (visibility: boolean) => ({
    type: ActionType.CHANGE_DELIVERY_DETAILS_VISIBILITY,
    payload: visibility
})