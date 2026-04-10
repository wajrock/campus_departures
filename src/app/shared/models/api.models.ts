import {BikeStation, BusLine} from "./models";

export interface ApiBikeStation {
    total_count: number;
    results: BikeStation[]
}

export interface ApiBusLine {
    total_count: number;
    results: BusLine[]
}