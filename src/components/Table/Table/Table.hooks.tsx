import { useState } from 'react'
import { useAppDispatch } from '../../../redux-store/hooks';
import { setOverlaps } from '../../../redux-store/bookingsSlice';

export const useModal = () => {

    const dispatch = useAppDispatch()
    const [modalOpened, setModalOpened] = useState(false);
    const [bookingInViewId, setBookingInViewId] = useState<string | undefined>()
    const handleOpen = (bookId: string) => {
        setModalOpened(true);
        setBookingInViewId(bookId)
    }
    const handleClose = () => {
        setModalOpened(false)
        dispatch(setOverlaps([]))
    } 

    return {
        modalOpened,
        bookingInViewId,
        handleOpen,
        handleClose
    }
}