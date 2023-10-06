import { IBooking, IBookingPayload, IsLoadingType, SortParamType } from "../types/types"


interface BookingsInitStateType {
    items: IBooking[]
    sortBy: SortParamType
    bookingsCount: number
    loadingStatus: IsLoadingType
    serverMsg: null | string
    newItem: {
        formState: IBookingPayload
        loadingStatus: IsLoadingType
    }
}

export const initialBookingState: BookingsInitStateType = {
    items: [],
    sortBy: 'createdAt',
    bookingsCount: 0,
    loadingStatus: 'loaded',
    serverMsg: null,
    newItem: {
        formState: {
            daysOfReservation: '3',
            guest: '',
            price: 0,
            roomNumber: 0,
            startDate: 0,
            note: '',
        },
        loadingStatus: 'loaded',
    }
}