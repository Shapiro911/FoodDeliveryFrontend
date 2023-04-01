import { AppDispatch } from "..";
import { Restaurant, SortValues } from "../../interfaces/restaurants.interface";
import { Destination } from "../../interfaces/search.interface";
import { ActionType, ActionTypeRequestStatus } from "./actionTypes";

export const addDestination = (destination: Destination) => ({
    type: ActionType.ADD_DESTINATION,
    payload: destination
})

export const getRestaurantsLoading = () => ({
    type: ActionTypeRequestStatus.REQUEST_RESTAURANTS_LOADING
})

export const getRestaurantsSuccess = (restaurantList: Restaurant[]) => ({
    type: ActionTypeRequestStatus.REQUEST_RESTAURANTS_SUCCESS,
    payload: restaurantList
})

export const getRestaurantsFailure = (error: string) => ({
    type: ActionTypeRequestStatus.REQUEST_RESTAURANTS_FAILURE,
    payload: error
})

export const getRestaurants = (coordinates: number[], sortValues: SortValues, page: number, pageSize: number, searchText: string): (dispatch: AppDispatch) => Promise<Restaurant[]> => async (dispatch: AppDispatch) => {
    let res: Restaurant[] = [];
    const param = `?coordinates=${coordinates}&page=${page}&pageSize=${pageSize}`;
    dispatch(getRestaurantsLoading());
    await fetch(process.env.REACT_APP_API_KEY + "restaurants" + param, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortValues: sortValues, searchText: searchText.trim() }),
    }).then(response => {
        if (!response.ok) {
            throw Error("Could not fetch the data for that resource");
        }
        return response.json();
    }).then(data => {
        dispatch(getRestaurantsSuccess(data));
        return res = data;
    }).catch(err => {
        dispatch(getRestaurantsFailure(err.message));
        return err.message;
    })
    return res;
}

export const getRestaurantById = (restaurantId: string | undefined): (dispatch: AppDispatch) => Promise<Restaurant> => async (dispatch: AppDispatch) => {
    let res: Restaurant = {
        id: "",
        name: "",
        img: "",
        duration: "",
        rating: 0,
        fee: 0,
        price: 0
    };
    const param = `?restaurantId=${restaurantId}`;
    dispatch(getRestaurantsLoading());
    await fetch(process.env.REACT_APP_API_KEY + "restaurants" + param, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        if (!response.ok) {
            throw Error("Could not fetch the data for that resource");
        }
        return response.json();
    }).then(data => {
        dispatch(getRestaurantsSuccess(data));
        return res = data;
    }).catch(err => {
        dispatch(getRestaurantsFailure(err.message));
        return err.message;
    })
    return res;
}

export const getImage = (image: string): () => Promise<string> => async () => {
    let res: string = "";
    await fetch(process.env.REACT_APP_GOOGLE_STORAGE_KEY + "restaurants/" + image)
        .then(async (response) => {
            if (!response.ok) {
                throw Error("Could not fetch image");
            }
            const blob = await response.blob()
            res = URL.createObjectURL(blob);
            return res;
        })
        .catch(err => {
            return err.message;
        })
    return res;
}
