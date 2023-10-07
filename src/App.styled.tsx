import { Box, styled } from "@mui/material";


export const WrapBox = styled(Box)({
    margin: '50px auto', 
    background: 'background.paper', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
}) as typeof Box

export const TabsBox = styled(Box)({
    borderBottom: '1px solid #E0E0E0',
    marginBottom: '50px',
}) as typeof Box

export const TabBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
}) as typeof Box





