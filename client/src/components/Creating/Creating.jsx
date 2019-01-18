import React from "react";
import CreatingFormation from "./CreatingFormation";
import CreatingGroupe from "./CreatingGroupe";          // CONTINUER A RAJOUTER DES CREATING ! (créneau, matière etc)
import CreatingModule from "./CreatingModule";
import CreatingMatiere from "./CreatingMatiere";
import CreatingCreneau from "./CreatingCreneau";

const Creating = () => (
    <div>
        <CreatingFormation />
        <br /> <br /> <br />
        <CreatingGroupe />
        <br /> <br /> <br />
        <CreatingModule />
        <br /> <br /> <br />
        <CreatingMatiere />
        <br /> <br /> <br />
        <CreatingCreneau />
    </div>
);

export default Creating;