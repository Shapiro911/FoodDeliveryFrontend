import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { restaurantsReducer } from "./restaurants/reducer";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { helperReducer } from "./helper/reducer";

const persistConfig = {
    key: "delivery",
    storage,
    blacklist: ["helper", "restaurants"]
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        restaurants: restaurantsReducer,
        helper: helperReducer
    })
);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch