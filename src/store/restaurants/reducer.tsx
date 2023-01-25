import { AnyAction } from "redux";
import { Request } from "../../interfaces/restaurants.interface";
import { Destination } from "../../interfaces/search.interface";
import { RequestStatus } from "../../utils/enums";
import { ActionType, ActionTypeRequestStatus } from "./actionTypes";

type restaurantsState = {
    destination: Destination,
    request: Request
}

const initialState: restaurantsState = {
    destination: { address: "", latLng: [] },
    request: { status: RequestStatus.IDLE, error: "" }
}

export const restaurantsReducer = (state: restaurantsState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionType.ADD_DESTINATION:
            return {
                ...state,
                destination: action.payload
            };
        case ActionTypeRequestStatus.REQUEST_RESTAURANTS_LOADING:
            return {
                ...state,
                request: { ...state.request, status: RequestStatus.LOADING }
            }
        case ActionTypeRequestStatus.REQUEST_RESTAURANTS_SUCCESS:
            return {
                ...state,
                request: {
                    ...state.request, status: RequestStatus.SUCCESS
                }
            }
        case ActionTypeRequestStatus.REQUEST_RESTAURANTS_FAILURE:
            return {
                ...state,
                request: { ...state.request, status: RequestStatus.FAILURE, error: action.payload }
            }
        default:
            return state;
    }
}