import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from '../api/api';
import { IBookingPayload } from '../types/types';
import { initialBookingState } from "./initial";


export const fetchGetBooking = createAsyncThunk('booking/fetchGetBooking', async () => {
    const response = await instance.get('/bookings')
    return response.data
})

export const fetchAddBooking = createAsyncThunk('booking/fetchAddBooking', async (payload: IBookingPayload) => {
    const response = await instance.post('/bookings', payload)
    console.log('response in Thunk', response)
    return response.data
})

export const fetchDeleteBooking = createAsyncThunk('booking/fetchDeleteBooking', async (id:string) => {
    const response = await instance.delete(`/bookings/${id}`)
    return response.data
})


const bookingsSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        handleChangeForm (state, action: PayloadAction<IBookingPayload>) {
            state.newItem.formState = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetBooking.pending, (state) => {
            state.loadingStatus = 'loading'
        })
            .addCase(fetchGetBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                state.items = [...state.items, action.payload.data];                
            })
            .addCase(fetchGetBooking.rejected, (state, action) => {
                console.log(action)
                state.loadingStatus = 'error'
                state.serverMsg = 'Не получилось загрузить бронирования, попробуйте перезагрузить страницу...'
            })

            .addCase(fetchAddBooking.pending, (state) => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchAddBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                state.items.push(action.payload);
            })
            .addCase(fetchAddBooking.rejected, (state) => {
                state.loadingStatus = 'error'
                state.serverMsg = 'Не получилось сделать бронирование, попробуйте еще разок...'
            })

            .addCase(fetchDeleteBooking.pending, (state) => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchDeleteBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                state.items = state.items.filter(el => el._id !== action.payload._id);
            })
            .addCase(fetchDeleteBooking.rejected, (state) => {
                state.loadingStatus = 'error'
                state.serverMsg = 'Не удалось удалить бронирование'
            })
    },

});



export const { handleChangeForm } = bookingsSlice.actions;


export default bookingsSlice.reducer;