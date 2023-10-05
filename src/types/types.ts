
export type IsLoadingType = 'loaded' | 'loading' | 'error'

export interface IBooking {
    _id: string
    roomNumber: number
    guest: string
    note?: string
    price: number
    daysOfReservation: number
    startDate: number
}
export type IBookingPayload = Omit<IBooking, '_id'> 
