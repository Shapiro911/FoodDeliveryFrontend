import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { restaurantsReducer } from "./restaurants/reducer";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "delivery",
    storage,
    // blacklist: ["restaurants"]
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        restaurants: restaurantsReducer,
    })
);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch