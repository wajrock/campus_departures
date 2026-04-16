![[campus-departures interface][https://campus-flow.wajrock.me/assets/cover.png](https://campus-flow.wajrock.me/assets/cover.png)](https://campus-flow.wajrock.me/assets/cover.png)

## Overview

**Campus Flow** is a high-availability transit dashboard designed for digital signage in educational institutions. It streamlines campus exits by providing students with an instantaneous, high-contrast overview of the local transport ecosystem.

By centralizing real-time data from multiple transit sources into a single, specialized interface, Campus Flow removes the friction of manual schedule checking during peak campus hours.

## Live Demo

**[Launch Campus Flow Dashboard](https://campus-flow.wajrock.me)**

## Features

- **Tailored campus interfaces** for major Rennes institutions: University of Rennes (Campus Centre), Rennes 2, RSB, INSA, ESIR, and ESUP.
- **Real-time countdowns** for bus and metro lines sourced from the STAR API.
- **Live bike station availability** monitoring for nearby VLS stations.
- High-contrast, **signage-ready UX** optimized for large hall displays.
- **Lightweight Angular application** built for fast updates and reliable display.

## Technical Stack

* **Framework**: Angular (TypeScript)
* **Data Source**: STAR OpenData API
* **Deployment**: GitHub Actions (FTP-Deploy)

## Installation

### Prerequisites

* Node.js (v18+)
* npm

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/wajrock/campus-flow.git
    cd campus-flow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the environment:**
    ```bash
    npm run start
    ```
    Access the dashboard at `http://localhost:4200/`.


## API Endpoints

The application consumes real-time data from the **Rennes Métropole Open Data** portal:

* **Bus Passages**: `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records`
* **VLS Stations Status**: `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/vls-stations-etat-tr/records`

## Project Structure

- `src/` — Contains the main Angular application code.
    - `app/` — Entry point for application features, routing, and global configuration.
        - `core/` — Shared services and constants used across the dashboard.
        - `features/` — Feature modules for main screens such as the dashboard and schools view.
        - `shared/` — Reusable UI components, pipes, and data models.
    - `assets/` — Static assets, JSON data, and icon resources.
    - `environments/` — Build-specific environment settings for development and production.
    - `angular.json` — Angular workspace configuration.
    - `package.json` — npm dependencies and scripts.
    - `tsconfig.json` — TypeScript compiler settings.

## License

This project is licensed under the MIT License.

## Contact

**Thibaud Wajrock** - [thibaud.wajrock@icloud.com](mailto:thibaud.wajrock@icloud.com)     |     **Portfolio** : https://wajrock.me
