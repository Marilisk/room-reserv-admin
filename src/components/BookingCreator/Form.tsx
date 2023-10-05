import React, { memo, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { IBooking } from '../../types/types'
import { fetchAddBooking, handleChangeForm } from '../../redux-store/bookingsSlice'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LineBox, StyledButton, StyledFormControl, StyledTextField } from './Form.styled'
import { validate } from '../../utils/validate'

const rooms = new Array(50).fill('').map((_, i) => i + 1)


const Form = () => {

    const values = useAppSelector(s => s.contracts.newItem.formState)
    const dispatch = useAppDispatch()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const loading = useAppSelector(s => s.contracts.loadingStatus === 'loading')

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IBooking) => {
        dispatch(handleChangeForm({ ...values, [field]: e.currentTarget.value }))
    }

    /* const handleSubmit = useCallback(() => {
        const errors = validate(values, ['guest', 'roomNumber', 'startDate', 'daysOfReservation'])
        console.log(values)
        console.log('errors', errors)
        Object.keys(errors).length ? setBtnDisabled(true) : dispatch(fetchAddBooking(values))
    }, [values, dispatch]) */
    const handleSubmit = () => {
        const errors = validate(values, ['guest', 'roomNumber', 'startDate', 'daysOfReservation'])
        console.log(values)
        console.log('errors', errors)
        Object.keys(errors).length ? setBtnDisabled(true) : dispatch(fetchAddBooking(values))
    }

    useEffect(() => {
        // для удобства ставим текущую дату в датапикер
        dispatch(handleChangeForm({ ...values, startDate: Date.now() }))
    }, [])

    useEffect(() => {
        // для раздизейблинга кнопки после неудачной попытки сабмита
        btnDisabled && setBtnDisabled(false)
    }, [values])


    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <LineBox>

                <StyledFormControl required >
                    <InputLabel id="demo-simple-select-required-label">номер апартаментов</InputLabel>
                    <Select labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={values.roomNumber}
                        label="номер апартаментов*"
                        onChange={(e) => {
                            dispatch(handleChangeForm({ ...values, roomNumber: e.target.value as number }))
                        }}
                    >
                        {rooms.map((room, i) => (
                            <MenuItem key={i} value={room}>{room}</MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <StyledTextField fullWidth value={values.price} onChange={(e) => onChange(e, 'price')} label='стоимость' />
            </LineBox>

            <LineBox >
                <DatePicker
                    sx={{ margin: '10px 20px', flex: 1 }}
                    label='дата заезда'
                    format='DD-MM-YYYY'
                    value={dayjs(new Date(values.startDate))}
                    onChange={(newValue) => {
                        const timeStamp = newValue?.toDate().getTime()
                        if (timeStamp) dispatch(handleChangeForm({ ...values, startDate: timeStamp }))
                    }} />
                <StyledTextField fullWidth value={values.daysOfReservation} onChange={(e) => {
                    console.log('typeof', typeof +(e.currentTarget.value))
                    onChange(e, 'daysOfReservation')
                } } label='дней пребывания' type='number' />
            </LineBox>

            <LineBox >
                <StyledTextField fullWidth value={values.guest} onChange={(e) => onChange(e, 'guest')} label='имя и фамилия гостя' />
            </LineBox>

            <LineBox >
                <StyledTextField fullWidth value={values.note} onChange={(e) => onChange(e, 'note')} label='примечание' multiline />
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