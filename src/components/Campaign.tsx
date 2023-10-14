import React, { ReactNode, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { Campaign, SubCampaign } from '../interface';
import InformationTab from './InformationTab';
import SubCampaignTab from './SubCampaign';


interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}



function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CampaignContainer = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [campaign, setCampaign] = useState<Campaign>({
        information: {
            name: '',
            describe: '',
        },
        subCampaigns: [
            {
                name: 'Chiến dịch con 1',
                status: true,
                ads: [
                    {
                        name: 'Quảng cáo 1',
                        quantity: 0,
                    }
                ],
            },
        ],
    });

    const handleAddSubCampaign = () => {
        setCampaign({
            ...campaign,
            subCampaigns: [
                ...campaign.subCampaigns,
                {
                    name: `Chiến dịch con ${campaign.subCampaigns.length + 1}`,
                    status: true,
                    ads: [
                        {
                            name: 'Quảng cáo 1',
                            quantity: 0,
                        },
                    ],
                },
            ],
        });
    }

    const handleUpdateSubCampaign = (newSubCampaign: SubCampaign, index: number) => {
        const updateSubCampaign = [...campaign.subCampaigns]
        updateSubCampaign.splice(index, 1, { ...newSubCampaign })
        setCampaign({
            ...campaign,
            subCampaigns: [...updateSubCampaign],
        });
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "right" }}>
                <Button sx={{ margin: "10px", alignItems: "right" }} variant="contained">Submit</Button>
            </div>

            <Box sx={{ margin: "0px 10px", border: "1px solid gray" }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Thông tin" {...a11yProps(0)} />
                        <Tab label="Chiến dịch con" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <InformationTab />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <SubCampaignTab
                        campaign={campaign}
                        handleAddSubCampaign={handleAddSubCampaign}
                        handleUpdateSubCampaign={handleUpdateSubCampaign}

                    />
                </CustomTabPanel>
            </Box>
        </div>

    );
}

export default CampaignContainer;