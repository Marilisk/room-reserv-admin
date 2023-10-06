import { FC } from 'react'
import { Backdrop, Box, Divider, Fade, Modal, Typography, } from '@mui/material'
import { useAppSelector } from '../../../../redux-store/hooks'
import { selectBooking } from '../../../../redux-store/bookingsSlice'
import { priceFormatter } from '../../../../utils/priceFromatter'
import { LineBox, modalStyles } from '../Table.styled'


interface IModalProps {
  modalOpened: boolean
  handleClose: () => void
  bookingInViewId?: string
}

const ModalWindow: FC<IModalProps> = ({ modalOpened, handleClose, bookingInViewId }: IModalProps) => {

  const bookings = useAppSelector(selectBooking)

  const currentItem = bookings.find(el => el._id === bookingInViewId)
  if (!bookingInViewId || !currentItem) return null

  return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={modalOpened}
    onClose={handleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}
  >
    <Fade in={modalOpened}>
      <Box sx={modalStyles}>

        <LineBox>
          <Typography variant="h6" component="h2" fontWeight='600' >
            Гость: &nbsp;
          </Typography>
          <Typography variant="h6" component="h2" >
            {currentItem?.guest}
          </Typography>
        </LineBox>
        <Divider />
        <LineBox>
          <Typography fontWeight='600' >
            Информация: &nbsp;
          </Typography>
          <Typography>
            {currentItem.note}
          </Typography>
        </LineBox>

        <Divider />
        <LineBox>
          <Typography fontWeight='600' >
            Общая стоимость проживания: &nbsp;
          </Typography>
          <Typography >
            {priceFormatter(currentItem.price)}
          </Typography>
        </LineBox>
      </Box>
    </Fade>
  </Modal>
}

export default ModalWindow