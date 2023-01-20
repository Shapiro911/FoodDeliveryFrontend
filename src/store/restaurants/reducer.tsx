import { AnyAction } from "redux";
import { Restaurant, Request } from "../../interfaces/restaurants.interface";
import { Destination } from "../../interfaces/search.interface";
import { RequestStatus } from "../../utils/enums";
import { ActionType, ActionTypeRequestStatus } from "./actionTypes";

type restaurantsState = {
    restaurants: Array<Restaurant>,
    destination: Destination,
    request: Request
}

const initialState: restaurantsState = {
    restaurants: [],
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
                restaurants: [...state.restaurants, ...action.payload],
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

// case ActionTypeRequestStatus.REQUEST_RESTAURANTS_LOADING:
//     return {
//         ...state,
//         request: { status: RequestStatus.LOADING }
//     }
// case ActionTypeRequestStatus.REQUEST_RESTAURANTS_SUCCESS:
//     return {
//         ...state,
//         restaurants: [...state.restaurants, ...action.payload],
//         request: { status: RequestStatus.SUCCESS }
//     }
// case ActionTypeRequestStatus.REQUEST_RESTAURANTS_FAILURE:
//     return {
//         ...state,
//         request: { status: RequestStatus.FAILURE, error: action.payload }
//     }