import { IBooking, IBookingPayload, ISortTag, IsLoadingType, SortParamType } from "../types/types"


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
    overlaps: IBooking[]
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
            price: 3000,
            roomNumber: 0,
            startDate: 0,
            note: '',
        },
        loadingStatus: 'loaded',
    },
    overlaps: [],
}

export const sortTags: ISortTag[] = [
    {
        label: "По дате создания",
        value: 'createdAt'
    },
    {
        label: "По дате заезда",
        value: 'startDate'
    },
]