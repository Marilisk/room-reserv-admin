import { RootState } from './store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from '../api/api';
import { IBooking, IBookingPayload, IDeletePayload, IGetPayload, SortParamType } from '../types/types';
import { initialBookingState } from "./initial";
import { createSelector } from '@reduxjs/toolkit'


export const fetchGetBooking = createAsyncThunk(
    'booking/fetchGetBooking',
    async ({ count, skip, rewrite }:IGetPayload, thunkAPI) => {
        const response = await instance.get(`/bookings/${count}/${skip}`)
        const state = thunkAPI.getState() as RootState
        const sortBy:SortParamType = state.contracts.sortBy
        const oldItems = state.contracts.items
        const sorted = rewrite ? response.data.bookings : [...oldItems, ...response.data.bookings]
        if (sortBy === 'createdAt') {
            sorted.sort((a:IBooking, b:IBooking) => {
                const aTs = new Date(a?.createdAt || 0).getTime()
                const bTs = new Date(b?.createdAt || 0).getTime()
                return aTs - bTs
            })
        } else {
            sorted.sort((a:IBooking, b:IBooking) => {
                return a.startDate - b.startDate
            })
        }
        return { items: sorted, docsCount: response.data.docsCount, rewrite }
    })

export const fetchAddBooking = createAsyncThunk('booking/fetchAddBooking', async (payload: IBookingPayload) => {
    const response = await instance.post('/bookings', payload)
    return response.data
})

export const fetchDeleteBooking = createAsyncThunk('booking/fetchDeleteBooking', async ({ ids }: IDeletePayload) => {
    const response = await instance.post(`/bookings/delete`, ids)
    return {data: response.data, ids}
})


const bookingsSlice = createSlice({
    name: 'booking',
    initialState: initialBookingState,
    reducers: {
        handleChangeForm(state, action: PayloadAction<IBookingPayload>) {
            state.newItem.formState = action.payload
        },
        sortList(state, action: PayloadAction<{ param: SortParamType }>) {
            state.sortBy = action.payload.param
            if (action.payload.param === 'createdAt') {
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
        },
        setOverlaps(state, action) {
            state.overlaps = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetBooking.pending, (state) => {
            state.loadingStatus = 'loading'
        })
            .addCase(fetchGetBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                state.items = action.payload.items
                state.bookingsCount = action.payload.docsCount
                state.serverMsg = ''
            })
            .addCase(fetchGetBooking.rejected, (state) => {
                state.loadingStatus = 'error'
                state.serverMsg = 'Не получилось загрузить бронирования, попробуйте перезагрузить страницу...'
            })

            .addCase(fetchAddBooking.pending, (state) => {
                state.newItem.loadingStatus = 'loading'
            })
            .addCase(fetchAddBooking.fulfilled, (state, action) => {
                state.newItem.loadingStatus = 'loaded'
                state.items.push(action.payload);
                state.newItem.formState = {
                    ...state.newItem.formState,
                    daysOfReservation: '3',
                    guest: '',
                    price: 3000,
                    roomNumber: 0,
                    note: '',
                }
                state.serverMsg = 'Бронирование успешно создано'
            })
            .addCase(fetchAddBooking.rejected, (state) => {
                state.newItem.loadingStatus = 'error'
                state.serverMsg = 'Не получилось сделать бронирование, попробуйте еще разок...'
            })

            .addCase(fetchDeleteBooking.pending, (state) => {
                state.loadingStatus = 'loading'
            })
            .addCase(fetchDeleteBooking.fulfilled, (state, action) => {
                state.loadingStatus = 'loaded'
                state.items = state.items.filter(el => action.payload.ids.indexOf(el._id) === -1 );
                state.overlaps = state.overlaps.filter(el => action.payload.ids.indexOf(el._id) === -1 );
            })
            .addCase(fetchDeleteBooking.rejected, (state) => {
                state.loadingStatus = 'error'
                state.serverMsg = 'Не удалось удалить бронирование'
            })
    },

});

const selectItems = (state: RootState) => state.contracts.items
export const selectBooking = createSelector(selectItems, (items) => items)

export const { handleChangeForm, sortList, setOverlaps } = bookingsSlice.actions;

export default bookingsSlice.reducer;