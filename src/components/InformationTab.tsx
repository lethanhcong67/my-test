import React from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Ads, Campaign, Information } from "../interface";
interface Props {
    campaign: Campaign,
    checkValidNameInfor: boolean,
    handleChangeInfor: (newInformation: Information) => void,
}
const InformationTab: React.FC<Props> = (props) => {
    const { campaign, checkValidNameInfor, handleChangeInfor } = props;
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
            <TextField
                required
                fullWidth
                id={checkValidNameInfor ? "outlined-error-helper-text" : "standard-required"}
                variant="standard"
                label="Tên chiến dịch"
                error={checkValidNameInfor ? false : true}
                helperText={checkValidNameInfor ? "" : "Dữ liệu không hợp lệ"}
                value={campaign.information.name}
                onChange={(e) => {
                    handleChangeInfor({ ...campaign.information, name: e.target.value })
                }}
            />
            <TextField fullWidth id="standard-basic" variant="standard" label="Mô tả" />
        </Box>
    )
}

export default InformationTab;