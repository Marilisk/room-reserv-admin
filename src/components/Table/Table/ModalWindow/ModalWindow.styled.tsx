import { Box, styled } from "@mui/material";


export const LeftBox = styled(Box)({
  minWidth: '48%',
  width: '48%',
  marginRight: '2%',
}) as typeof Box


export const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  padding: 4,
}