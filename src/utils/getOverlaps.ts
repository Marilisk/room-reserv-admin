import { IBooking } from "../types/types"



export const getOverlaps = (bookings: IBooking[], bookingInViewId: string) => {
    const booking = bookings.find(b => b._id === bookingInViewId)
    const errors: IBooking[] = []
    const others = bookings.filter(b => b.roomNumber === booking?.roomNumber)
    if (!others.length) return errors
    others.forEach((elem1, ind, array) => {
        const timeOff1 = +elem1.daysOfReservation * 86400000 + elem1.startDate
        array.forEach((elem2, i) => {
            if (ind === i) return
            const timeOff2 = +elem2.daysOfReservation * 86400000 + elem2.startDate
            if (elem1.startDate > elem2.startDate && timeOff2 > elem1.startDate && !errors.find(b => b._id === elem2._id)) errors.push(elem2)
            if (elem2.startDate > elem1.startDate && timeOff1 > elem2.startDate && !errors.find(b => b._id === elem2._id)) errors.push(elem2)
        })
    })
    return errors
}