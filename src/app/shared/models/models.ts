export interface TransportInfos {
    id: string;
    type: "bus" | "metro" | "bikes";
    name: string;
    stop: string;
    icon: string;
    sens?: number;
}


export interface PillData {
    value: string | number;
    valueState?: 'existing' | 'missing' | 'empty'; 
    type: 'metro' | 'bikes' | 'bus';
    thresholdValue?: number;
}

export interface SchoolDetails {
    schoolId: string;
    schoolName: string;
    schoolLogo: string;
    metroLines: MetroLineDetails[];
    bikeStations: BikeStationDetails[];
    busLines: BusLineDetails[];
}
export interface MetroLineDetails {
    "id": string,
    "name": string,
    "stop": string
    "icon": string,
}

export interface BikeStationDetails {
    "id": string,
    "name": string,
    "stop": string
    "icon": string,
}

export interface BusLineDetails {
    "id": string,
    "sens": number,
    "name": string,
    "stop": string
    "icon": string,
}