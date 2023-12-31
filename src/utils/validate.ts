import { IBookingPayload } from "../types/types"

const errText = 'заполните поле'

const lengthValidate = (value?: string | number) => {
    if (!value) return errText
    if (typeof value === 'number' && value) return
    let error
    if (typeof value === 'string' && !value.length) error = errText
    return error
}


export const validate = (
    values: IBookingPayload,
    required: (keyof IBookingPayload)[]
) => {

    const errors: { [k: string]: string } = {}
    required.forEach((field) => {
        let err = lengthValidate(values[field])
        if (err) errors[field] = err
    })

    return errors
}