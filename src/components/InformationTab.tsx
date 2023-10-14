import React from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const InformationTab = () => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
                display: "flex", flexDirection: 'column'
            }}
            noValidate
            autoComplete="off"
        >
            <TextField required fullWidth id="standard-required" variant="standard" label="Tên chiến dịch" />
            <TextField fullWidth id="standard-basic" variant="standard" label="Mô tả" />
        </Box>
    )
}

export default InformationTab;