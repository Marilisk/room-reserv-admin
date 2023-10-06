
export type IsLoadingType = 'loaded' | 'loading' | 'error'

export interface IBooking {
    _id: string
    roomNumber: number
    guest: string
    note?: string
    price: number
    daysOfReservation: string
    startDate: number
    createdAt?: string
}
export type IBookingPayload = Omit<IBooking, '_id'> 

export interface IGetPayload {
    count: number
    skip: number
    rewrite: boolean
}

export interface IDeletePayload {
    ids: string[]
}

export type SortParamType = 'startDate' | 'createdAt'

export interface ISortTag {
    label: string
    value: SortParamType
}
