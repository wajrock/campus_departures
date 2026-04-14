export interface ApiBikeStation {
    total_count: number;
    results: BikeStation[]
}

export interface ApiBusLine {
    total_count: number;
    results: BusLine[]
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