import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from '../api/api';
import { IBookingPayload, IDeletePayload, IGetPayload, SortParamType } from '../types/types';
import { initialBookingState } from "./initial";
import { createSelector } from '@reduxjs/toolkit'


export const fetchGetBooking = createAsyncThunk(
        'booking/fetchGetBooking', 
        async ({count, skip, rewrite}: IGetPayload ) => {
    const response = await instance.get(`/bookings/${count}/${skip}`)
    return {data: response.data, rewrite}
})

export const fetchAddBooking = createAsyncThunk('booking/fetchAddBooking', async (payload: IBookingPayload) => {
    const response = await instance.post('/bookings', payload)
    return response.data
})

export const fetchDeleteBooking = createAsyncThunk('booking/fetchDeleteBooking', async ({ids}:IDeletePayload) => {
    const response = await instance.post(`/bookings/delete`, ids )
    return response.data
})


const bookingsSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        handleChangeForm (state, action: PayloadAction<IBookingPayload>) {
            state.newItem.formState = action.payload
        },
        sortList(state, action:PayloadAction<{param: SortParamType }>) {
            state.sortBy = action.payload.param
            if (action.payload.param === 'createdAt' ) {
                //console.log(new Date(state.items[0].createdAt).getTime())
                state.items.sort((a, b) => {
                    const aTs = new Date(a?.createdAt || 0).getTime() 
                    const bTs = new Date(b?.createdAt || 0).getTime() 
                    return aTs - bTs 
                })
            } else {
                state.items.sort((a, b) => {
                    return a.startDate - b.startDate 
                })
            }
            /* const sorted = 
            state.items = sorted */
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetBooking.pending, (state) => {
            state.loadingStatus = 'loading'
        })
            .addCase(fetchGetBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                if (action.payload.rewrite) {
                    state.items = action.payload.data.bookings 
                } else {
                    state.items = [...state.items, ...action.payload.data.bookings];   
                }
                state.bookingsCount = action.payload.data.docsCount
            })
            .addCase(fetchGetBooking.rejected, (state, action) => {
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

const selectItems = (state:RootState) => state.contracts.items
export const selectBooking = createSelector(selectItems, (items) => items )

export const { handleChangeForm, sortList } = bookingsSlice.actions;

export default bookingsSlice.reducer;