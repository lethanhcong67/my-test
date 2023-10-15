import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import CheckCircle from '@mui/icons-material/CheckCircle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { Ads, Campaign, SubCampaign } from "../interface";


interface Props {
    campaign: Campaign,
    handleAddSubCampaign: () => void,
    handleUpdateSubCampaign: (newSubCampaign: SubCampaign, index: number) => void,
    isSubmit: boolean,
}


const SubCampaignTab: React.FC<Props> = (props) => {
    const { campaign, handleAddSubCampaign, handleUpdateSubCampaign, isSubmit } = props
    const { information, subCampaigns } = campaign

    const [checkActive, setCheckActive] = useState<SubCampaign>({ ...subCampaigns[0] })
    const [checkIdActive, setCheckIdActive] = useState<number>(0)

    console.log("checkActive: ", checkActive);

    const handleDeleteManySub = () => {
        console.log("delete checkActive: ", checkActive);

    }

    return (
        <Box>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" overflow="auto">
                    <IconButton sx={{
                        backgroundColor: "rgb(237, 237, 237)",
                        width: "48px",
                        height: "48px"
                    }}
                        onClick={handleAddSubCampaign}
                    >
                        <Add sx={{ color: "#f50057", }} />
                    </IconButton>

                    {subCampaigns.map((item, index) => {
                        let totalQuantity: number = item.ads.reduce((total, it) => {
                            return total + it.quantity;
                        }, 0)

                        let checkQuantityAds = item.ads.filter((it, idx) => {
                            return it.quantity <= 0;
                        })
                        let checkNameAds = item.ads.filter((it, idx) => {
                            return it.name === "";
                        })

                        return (
                            <Paper
                                sx={{
                                    minWidth: "210px",
                                    height: "120px",
                                    marginLeft: "16px",
                                    cursor: "pointer",
                                    border: checkIdActive === index ? "2px solid rgb(33, 150, 243)" : "",
                                }}
                                onClick={() => {
                                    setCheckActive(item);
                                    setCheckIdActive(index)
                                }}
                            >
                                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" padding="8px 0px">
                                    <div style={{ fontSize: "1.25rem", fontWeight: 500, color: isSubmit && (checkQuantityAds.length !== 0 || checkNameAds.length !== 0) ? "red" : "black" }}>{item.name}</div>
                                    <CheckCircle
                                        sx={{
                                            color: item.status ? "rgb(0, 128, 0)" : "rgb(141, 141, 141)",
                                            fontSize: "14px"
                                        }}
                                    />
                                </Stack>


                                <div style={{ fontSize: "1.55rem", fontWeight: 500 }}>{
                                    totalQuantity
                                }</div>
                            </Paper>
                        )
                    })}

                </Stack>
                <Stack direction="row" alignItems="center">
                    <TextField
                        sx={{ width: "70%" }}
                        required id="standard-required"
                        variant="standard" label="Tên chiến dịch"
                        value={checkActive.name}
                        onChange={(e) => {
                            setCheckActive({ ...checkActive, name: e.target.value })
                            handleUpdateSubCampaign({ ...checkActive, name: e.target.value }, checkIdActive)
                        }}
                    />
                    <FormGroup sx={{ width: "30%" }}>
                        <FormControlLabel
                            sx={{ display: "flex", justifyContent: "center" }}
                            control={
                                <Checkbox
                                    checked={checkActive.status}
                                    onChange={(e) => {
                                        setCheckActive({ ...checkActive, status: e.target.checked })
                                        handleUpdateSubCampaign({ ...checkActive, status: e.target.checked }, checkIdActive)
                                    }}
                                />
                            }
                            label="Đang hoạt động" />
                    </FormGroup>
                </Stack>
                <Stack direction="column">
                    <div style={{ fontSize: "1.25rem", fontWeight: 500, textAlign: "left" }} >DANH SÁCH QUẢNG CÁO</div>
                    <table>
                        <tr >
                            <td style={{ textAlign: "left", width: "50px" }}>
                                <Checkbox />
                            </td>
                            <td style={{ textAlign: "left" }}>Tên quảng cáo*</td>
                            <td style={{ textAlign: "left" }}>Số lượng*</td>
                            <td style={{ textAlign: "right", width: "100px" }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<Add />}
                                    onClick={() => {
                                        const newAds = [...checkActive.ads, { name: `Quảng cáo ${checkActive.ads.length + 1}`, quantity: 0 }]
                                        setCheckActive({ ...checkActive, ads: newAds })
                                        handleUpdateSubCampaign({ ...checkActive, ads: newAds }, checkIdActive)
                                    }}
                                >
                                    Thêm
                                </Button>
                            </td>
                        </tr>
                        {checkActive.ads.map((item, index) => {
                            let checkQuantity = item.quantity > 0 ? true : false;
                            let checkName = item.name ? true : false;
                            return (
                                <tr style={{ borderBottom: "2px solid rgba(224, 224, 224, 1)" }}>
                                    <td style={{ textAlign: "left", width: "50px" }}>
                                        <Checkbox />
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                        <TextField
                                            sx={{ width: "90%" }}
                                            required id="standard-required"
                                            error={checkName ? false : true}
                                            variant="standard"
                                            value={item.name}
                                            onChange={(e) => {
                                                const newItem = { ...item, name: e.target.value }
                                                const cloneAds = [...checkActive.ads]
                                                cloneAds.splice(index, 1, newItem)
                                                setCheckActive({ ...checkActive, ads: cloneAds })
                                                handleUpdateSubCampaign({ ...checkActive, ads: cloneAds }, checkIdActive)
                                            }}

                                        />
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                        <TextField
                                            sx={{ width: "90%" }}
                                            required id="standard-required"
                                            variant="standard"
                                            type="number"
                                            error={checkQuantity ? false : true}
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newItem = { ...item, quantity: +e.target.value }
                                                const cloneAds = [...checkActive.ads]
                                                cloneAds.splice(index, 1, newItem)
                                                setCheckActive({ ...checkActive, ads: cloneAds })
                                                handleUpdateSubCampaign({ ...checkActive, ads: cloneAds }, checkIdActive)
                                            }}
                                        />
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        <Tooltip title="Xoá">
                                            <IconButton
                                                sx={{
                                                    width: "1.5rem",
                                                    height: "1.5rem",
                                                }}
                                                onClick={() => {
                                                    const cloneAds = [...checkActive.ads]
                                                    cloneAds.splice(index, 1)
                                                    setCheckActive({ ...checkActive, ads: cloneAds })
                                                    handleUpdateSubCampaign({ ...checkActive, ads: cloneAds }, checkIdActive)
                                                }}
                                            >
                                                <Delete sx={{ color: "#0000008a", }} />
                                            </IconButton>
                                        </Tooltip>

                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SubCampaignTab;