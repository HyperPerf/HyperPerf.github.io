import { DOCTRINES, PUBLIC } from "./doctrines.js";
import { hexToRgb } from "./utils.js";
import { renderGameUI, renderActionPanel } from "./ui/gameUI.js";
import { DebateGame } from "./classes/DebateGame.js";

// Variables globales
let selectedDoctrine = null;
let opponentDoctrine = null;
let game = null;

// Initialisation des cartes de doctrines
function renderDoctrineCards(containerId, isOpponent = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    Object.entries(DOCTRINES).forEach(([key, doctrine]) => {
        const card = document.createElement("div");
        card.className = "doctrine-card";
        card.setAttribute("data-doctrine", key);
        card.innerHTML = `
            <h3>${doctrine.icon || "⚔️"} ${doctrine.name || key}</h3>
            <p>${isOpponent ? `${doctrine.descriptionEnemy || key}.` : doctrine.description || ""}</p>
            ${doctrine.descriptionQuote ? `<p><em>${doctrine.descriptionQuote}</em></p>` : ""}
        `;
        card.style.borderTop = `3px solid ${doctrine.color}`;
        card.addEventListener("click", () => {
            if (isOpponent) {
                selectOpponentDoctrine(key, card);
            } else {
                selectDoctrine(key, card);
            }
        });
        container.appendChild(card);
    });

    // Ajout de la carte "Aléatoire" pour l'adversaire
    if (isOpponent) {
        const randomCard = document.createElement("div");
        randomCard.className = "doctrine-card";
        randomCard.setAttribute("data-doctrine", "random");
        randomCard.innerHTML = `
            <h3>🎲 Aléatoire</h3>
            <p>Le jeu choisira une doctrine au hasard pour votre adversaire.</p>
        `;
        randomCard.style.background = "linear-gradient(135deg, #4a4a6a, #2a2a4a)";
        randomCard.addEventListener("click", () => selectOpponentDoctrine("random", randomCard));
        container.appendChild(randomCard);
    }
}

// Sélection de la doctrine du joueur
function selectDoctrine(doctrineKey, card) {
    selectedDoctrine = doctrineKey;
    const doctrine = DOCTRINES[doctrineKey];

    // Réinitialise les styles des autres cartes
    document.querySelectorAll("#player-doctrine-choice .doctrine-card").forEach((c) => {
        c.style.borderColor = "#333";
        c.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
        c.classList.remove("selected");
    });

    // Met en surbrillance la carte sélectionnée
    card.style.borderColor = doctrine.color;
    card.style.boxShadow = `0 0 25px rgba(${hexToRgb(doctrine.color)}, 0.7)`;
    card.classList.add("selected");

    // Affiche le menu de sélection de l'adversaire
    document.getElementById("opponent-choice").style.display = "block";
    renderDoctrineCards("opponent-doctrine-choice", true);
}

// Sélection de la doctrine de l'adversaire
function selectOpponentDoctrine(doctrineKey, card) {
    opponentDoctrine = doctrineKey;
    const doctrine = DOCTRINES[doctrineKey];
    // Réinitialise les styles des autres cartes
    document.querySelectorAll("#opponent-doctrine-choice .doctrine-card").forEach((c) => {
        c.style.borderColor = "#333";
        c.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
        c.classList.remove("selected");
    });

    // Met en surbrillance la carte sélectionnée
    if (doctrineKey !== "random") {
        card.style.borderColor = doctrine.color;
        card.style.boxShadow = `0 0 25px rgba(${hexToRgb(doctrine.color)}, 0.7)`;
    } else {
        card.style.borderColor = "#8a2be2";
        card.style.boxShadow = "0 0 25px rgba(138, 43, 226, 0.7)";
    }
    card.classList.add("selected");
}

// Confirmation du choix de l'adversaire et démarrage du jeu
function confirmOpponentChoice() {
    if (!opponentDoctrine || opponentDoctrine === "random") {
        const doctrines = Object.keys(DOCTRINES);
        opponentDoctrine = doctrines[Math.floor(Math.random() * doctrines.length)];
    }

    document.getElementById("setup-screen").style.display = "none";
    document.getElementById("game-container").style.display = "grid";
    console.log("WARD 2 : ",PUBLIC);
    const publicInclination = PUBLIC;
    // Passe les clés des doctrines au constructeur de DebateGame
    game = new DebateGame(selectedDoctrine, opponentDoctrine, publicInclination);

    renderGameUI(game);
    renderActionPanel(game, (move) => game.handleMove(move));
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    renderDoctrineCards("player-doctrine-choice");
    document.getElementById("confirm-opponent-button").addEventListener("click", confirmOpponentChoice);
});
