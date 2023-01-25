import { AnyAction } from "redux";
import { ActionType } from "./actionTypes";

type helperState = {
    deliveryDetailsVisibility: boolean
}

const initialState: helperState = {
    deliveryDetailsVisibility: false
}

export const helperReducer = (state: helperState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionType.CHANGE_DELIVERY_DETAILS_VISIBILITY:
            return {
                ...state,
                deliveryDetailsVisibility: action.payload
            }
        default:
            return state;
    }
}