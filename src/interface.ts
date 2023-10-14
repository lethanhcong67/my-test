export interface Ads {
    name: string;
    quantity: number;
}

export interface SubCampaign {
    name: string;
    status: boolean;
    ads: Ads[];
}

export interface Campaign {
    information: {
        name: string;
        describe?: string;
    };
    subCampaigns: SubCampaign[];
}