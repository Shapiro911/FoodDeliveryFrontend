import { RequestStatus } from "../../utils/enums";

export enum ActionType {
    ADD_DESTINATION = "addDestination",
    GET_RESTAURANTS = "getRestaurants",
}

export enum ActionTypeRequestStatus {
    REQUEST_RESTAURANTS_LOADING = RequestStatus.LOADING,
    REQUEST_RESTAURANTS_SUCCESS = RequestStatus.SUCCESS,
    REQUEST_RESTAURANTS_FAILURE = RequestStatus.FAILURE
}