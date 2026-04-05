export interface TransportInfos {
    id: number;
    type: "bus" | "metro" | "bikes";
    name: string;
    stop: string;
    icon: string;
}

export interface BikeStation {
    idstation: string,
    nom: string,
    coordonnees: {
        lon: number,
        lat: number;
    },
    etat: [
        "En fonctionnement" | "En panne"
    ],
    nombreemplacementsactuels: number,
    nombreemplacementsdisponibles: number,
    nombrevelosdisponibles: number,
    lastupdate: string;
}