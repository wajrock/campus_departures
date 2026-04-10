export interface TransportInfos {
    id: string;
    type: "bus" | "metro" | "bikes";
    name: string;
    stop: string;
    icon: string;
    sens?: number;
}

export interface BikeStation {
    idstation: string,
    nom: string,
    etat: "En fonctionnement" | "En panne",
    nombreemplacementsactuels: number,
    nombreemplacementsdisponibles: number,
    nombrevelosdisponibles: number
}

export interface BusLine {
    idligne: string,
    sens: number,
    depart: string
}

export interface PillData {
    value: string | number;
    valueState?: 'existing' | 'missing' | 'empty'; 
    type: 'metro' | 'bikes' | 'bus';
    thresholdValue?: number;
}