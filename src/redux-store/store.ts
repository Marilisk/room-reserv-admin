import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "./bookingsSlice";

export const store = configureStore({
    reducer: {
        contracts: bookingsSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch