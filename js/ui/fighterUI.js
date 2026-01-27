import { DOCTRINES } from '../doctrines.js';

export function updateFighterCard(game) {
    if (!game) {
        console.error("Erreur : game est undefined dans updateFighterCard");
        return;
    }

    // Vérification de l'existence des éléments DOM
    const p1DoctrineIcon = document.getElementById("p1-doctrine-icon");
    const p1DoctrineName = document.getElementById("p1-doctrine-name");
    const p1SatoriContainer = document.getElementById("p1-satori-container");
    const p1SatoriLabel = document.getElementById("p1-satori-label");
    const p1ProvocationContainer = document.getElementById("p1-provocation-container");
    const p1ProvocationLabel = document.getElementById("p1-provocation-label");

    const p2DoctrineIcon = document.getElementById("p2-doctrine-icon");
    const p2DoctrineName = document.getElementById("p2-doctrine-name");
    const p2SatoriContainer = document.getElementById("p2-satori-container");
    const p2SatoriLabel = document.getElementById("p2-satori-label");
    const p2ProvocationContainer = document.getElementById("p2-provocation-container");
    const p2ProvocationLabel = document.getElementById("p2-provocation-label");

    if (!p1DoctrineIcon || !p1DoctrineName || !p2DoctrineIcon || !p2DoctrineName) {
        console.error("Erreur : un ou plusieurs éléments du DOM sont introuvables");
        return;
    }

    // Mise à jour du combattant du joueur
    const playerDoctrine = game.playerDoctrine;
    const opponentDoctrine = game.opponentDoctrine;

    // Mise à jour des icônes et labels du joueur
    p1DoctrineIcon.innerHTML = `${playerDoctrine.icon || '⚔️'} <span id='p1-doctrine-name'>${playerDoctrine.name || 'Inconnu'}</span>`;
    document.getElementById("p1-health-label").textContent = playerDoctrine.healthLabel || "Vitalité";
    document.getElementById("p1-focus-label").textContent = playerDoctrine.focusLabel || "Concentration";

    // Gestion des jauges spécifiques pour le joueur
    if (p1SatoriContainer && p1SatoriLabel && p1ProvocationContainer && p1ProvocationLabel) {
        if (playerDoctrine.id === "buddhist") {
            p1SatoriContainer.style.display = "block";
            p1SatoriLabel.style.display = "block";
            p1ProvocationContainer.style.display = "none";
            p1ProvocationLabel.style.display = "none";
        } else if (playerDoctrine.id === "cynic") {
            p1SatoriContainer.style.display = "none";
            p1SatoriLabel.style.display = "none";
            p1ProvocationContainer.style.display = "block";
            p1ProvocationLabel.style.display = "block";
        } else {
            p1SatoriContainer.style.display = "none";
            p1SatoriLabel.style.display = "none";
            p1ProvocationContainer.style.display = "none";
            p1ProvocationLabel.style.display = "none";
        }
    }

    // Mise à jour du combattant adverse
    p2DoctrineIcon.innerHTML = `${opponentDoctrine.icon || '⚔️'} <span id='p2-doctrine-name'>${opponentDoctrine.name || 'Inconnu'}</span>`;
    document.getElementById("p2-health-label").textContent = opponentDoctrine.healthLabel || "Vitalité";
    document.getElementById("p2-focus-label").textContent = opponentDoctrine.focusLabel || "Concentration";

    // Gestion des jauges spécifiques pour l'adversaire
    if (p2SatoriContainer && p2SatoriLabel && p2ProvocationContainer && p2ProvocationLabel) {
        if (opponentDoctrine.id === "buddhist") {
            p2SatoriContainer.style.display = "block";
            p2SatoriLabel.style.display = "block";
            p2ProvocationContainer.style.display = "none";
            p2ProvocationLabel.style.display = "none";
        } else if (opponentDoctrine.id === "cynic") {
            p2SatoriContainer.style.display = "none";
            p2SatoriLabel.style.display = "none";
            p2ProvocationContainer.style.display = "block";
            p2ProvocationLabel.style.display = "block";
        } else {
            p2SatoriContainer.style.display = "none";
            p2SatoriLabel.style.display = "none";
            p2ProvocationContainer.style.display = "none";
            p2ProvocationLabel.style.display = "none";
        }
    }
}
