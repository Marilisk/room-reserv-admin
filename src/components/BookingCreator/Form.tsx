import React, { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { Box, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { IBooking } from '../../types/types'
import { fetchAddBooking, handleChangeForm } from '../../redux-store/bookingsSlice'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LineBox, StyledButton, StyledFormControl, StyledTextField } from './Form.styled'
import { validate } from '../../utils/validate'

const rooms = new Array(30).fill('').map((_, i) => i + 1)

const Form = () => {

    const values = useAppSelector(s => s.contracts.newItem.formState)
    const [errors, setErrors] = useState<{ [k: string]: string }>({})
    const dispatch = useAppDispatch()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const loading = useAppSelector(s => s.contracts.newItem.loadingStatus === 'loading')
    const srvMsg = useAppSelector(s => s.contracts.serverMsg)
    const [serverMsg, setServerMsg] = useState<string | undefined | null>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IBooking) => {
        dispatch(handleChangeForm({ ...values, [field]: e.currentTarget.value }))
    }

    const handleSubmit = useCallback(() => {
        const errors = validate(values, ['guest', 'roomNumber', 'startDate', 'daysOfReservation', 'price'])
        if (Object.keys(errors).length) {
            setBtnDisabled(true)
            setErrors(errors)
        } else {
            dispatch(fetchAddBooking(values))
            setErrors({})
        }
    }, [values, dispatch])

    useEffect(() => {
        // для удобства ставим текущую дату в датапикер
        dispatch(handleChangeForm({ ...values, startDate: Date.now() }))
    }, [])

    useEffect(() => {
        // для раздизейблинга кнопки после неудачной попытки сабмита
        if (btnDisabled) {
            setBtnDisabled(false)
            setErrors({})
        }
    }, [values])

    useEffect(() => {
        // убираем по таймеру сообщение об успехе 
        setServerMsg(srvMsg)
        const timer = setTimeout(() => setServerMsg(undefined), 2500)
        return () => clearTimeout(timer)
    }, [srvMsg, loading])


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <LineBox>

                <StyledFormControl required >
                    <InputLabel id="demo-simple-select-required-label">номер апартаментов</InputLabel>
                    <Select labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={values.roomNumber}
                        label="номер апартаментов*"
                        error={!!errors.roomNumber}
                        onChange={(e) => {
                            dispatch(handleChangeForm({ ...values, roomNumber: e.target.value as number }))
                        }}
                    >
                        {rooms.map((room, i) => (
                            <MenuItem key={i} value={room}>{room}</MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <StyledTextField fullWidth value={values.price}
                    error={!!errors.price}
                    onChange={(e) => onChange(e, 'price')}
                    label='стоимость, руб.' type='number' />
            </LineBox>

            <LineBox >
                <DatePicker
                    sx={{ margin: '10px 20px', flex: 1 }}
                    disablePast
                    label='дата заезда'
                    format='DD.MM.YYYY'
                    value={dayjs(new Date(values.startDate))}
                    onChange={(newValue) => {
                        const timeStamp = newValue?.toDate().getTime()
                        if (timeStamp) dispatch(handleChangeForm({ ...values, startDate: timeStamp }))
                    }} />
                <StyledTextField fullWidth
                    value={values.daysOfReservation}
                    onChange={(e) => onChange(e, 'daysOfReservation')}
                    label='дней пребывания'
                    error={!!errors.daysOfReservation || +values.daysOfReservation > 200}
                    type='number' />

            </LineBox>
            <LineBox>
                <Box sx={{ flex: 1, margin: '10px 20px', display: 'flex' }}>
                    <Typography fontWeight='600' color='GrayText'>дата отъезда:&nbsp;</Typography>
                    <Typography fontWeight='600' color='GrayText'>
                        {new Date((+values.daysOfReservation * 86400000) + values.startDate).toLocaleDateString()}
                    </Typography>
                </Box>
            </LineBox>

            <LineBox >
                <StyledTextField
                    required
                    fullWidth
                    value={values.guest}
                    onChange={(e) => onChange(e, 'guest')}
                    label='имя и фамилия гостя'
                    type='text'
                    error={!!errors.guest}
                />
            </LineBox>

            <LineBox >
                <StyledTextField fullWidth value={values.note} onChange={(e) => onChange(e, 'note')} label='примечание' multiline />
            </LineBox>

            <LineBox>
                {serverMsg && <Typography fontWeight='600' color='Highlight'>{srvMsg}</Typography>}
            </LineBox>

            <LineBox>
                <StyledButton type='submit'
                    onClick={handleSubmit}
                    variant='outlined'
                    disabled={btnDisabled || loading} >
                    отправить
                </StyledButton>
            </LineBox>

        </LocalizationProvider>
    )
}

export default memo(Form)