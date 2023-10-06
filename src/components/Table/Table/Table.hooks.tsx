import { useState } from 'react'

export const useModal = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [bookingInViewId, setBookingInViewId] = useState<string | undefined>()
    const handleOpen = (bookId: string) => {
        setModalOpened(true);
        setBookingInViewId(bookId)
    }
    const handleClose = () => setModalOpened(false);

    return {
        modalOpened,
        bookingInViewId,
        handleOpen,
        handleClose
    }
}