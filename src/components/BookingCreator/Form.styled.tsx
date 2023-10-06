import { Box, Button, FormControl, TextField, styled } from '@mui/material'



export const StyledTextField = styled(TextField)({
    margin: '10px 20px',
    flex: 1, 
}) as typeof TextField

export const LineBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}) as typeof Box

export const StyledFormControl = styled(FormControl)({
     margin: '10px 20px',
    flex: 1, 
}) as typeof FormControl

export const StyledButton = styled(Button)({
    margin: '20px 20px 10px 20px', 
}) as typeof Button

