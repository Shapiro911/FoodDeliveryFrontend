import { AnyAction } from "redux";

type restaurantsState = {
    restaurants: Array<String>
}

const initialState: restaurantsState = {
    restaurants: [""]
}

export const restaurantsReducer = (state: restaurantsState = initialState, action: AnyAction) => {
    switch (action) {
        default:
            return state;
    }
}