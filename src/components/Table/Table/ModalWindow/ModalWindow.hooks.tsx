import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux-store/hooks"
import { getOverlaps } from "../../../../utils/getOverlaps"
import { IBooking } from "../../../../types/types"
import { setOverlaps } from "../../../../redux-store/bookingsSlice"


export const useOverlaps = (bookingInViewId: string, bookings: IBooking[]) => {

    const dispatch = useAppDispatch()

    const overlaps = useAppSelector(s => s.contracts.overlaps)

    useEffect(() => {
        const overlaps = getOverlaps(bookings, bookingInViewId)
        overlaps.length && dispatch(setOverlaps(overlaps))
    }, [bookingInViewId])

    return { overlaps }
}