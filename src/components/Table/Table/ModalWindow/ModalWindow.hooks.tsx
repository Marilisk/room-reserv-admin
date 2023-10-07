import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux-store/hooks"
import { getOverlaps } from "../../../../utils/getOverlaps"
import { IBooking } from "../../../../types/types"
import { setOverlaps } from "../../../../redux-store/bookingsSlice"


export const useOverlaps = (bookingInViewId: string, bookings: IBooking[]) => {

    const dispatch = useAppDispatch()
    const [showOverLaps, setShowOverlaps] = useState(false)
    useEffect(() => {
        showOverLaps && setShowOverlaps(false)
    }, [bookingInViewId])

    const overlaps = useAppSelector(s => s.contracts.overlaps)

    const findOverLaps = () => {
        if (bookingInViewId) {
            setShowOverlaps(true)
            const overlaps = getOverlaps(bookings, bookingInViewId)
            overlaps.length && dispatch(setOverlaps(overlaps))
        }
    }
    return {
        overlaps,
        findOverLaps,
        showOverLaps,
    }
}