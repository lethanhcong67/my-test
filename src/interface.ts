export interface Ads {
    name: string;
    quantity: number;
}

export interface Information {
    name: string;
    describe?: string;
}

export interface SubCampaign {
    name: string;
    status: boolean;
    ads: Ads[];
}

export interface Campaign {
    information: Information;
    subCampaigns: SubCampaign[];
}