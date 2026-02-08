import { DOCTRINES, PUBLIC } from "./doctrines.js";
import { hexToRgb } from "./utils.js";
import { renderGameUI, renderCraftPool, animateAttack } from "./ui/gameUI.js";
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
        /*const rgb = doctrine.rgb;
        let r = rgb.r;
        let g = rgb.g;
        let b = rgb.b;*/
        const card = document.createElement("div");
        card.className = "doctrine-card";
        card.setAttribute("data-doctrine", key);
        card.innerHTML = `
            <h3>${doctrine.icon || "⚔️"} ${doctrine.name || key}</h3>
            <p>${isOpponent ? `${doctrine.descriptionEnemy || key}.` : doctrine.description || ""}</p>
            ${doctrine.descriptionQuote ? `<p><em>${doctrine.descriptionQuote}</em></p>` : ""}
        `;
        card.style.borderTop = `3px solid ${doctrine.color}`;
        //card.style.background = `radial-gradient(circle at center, rgba(${r}, ${g}, ${b}, 0.75) 0%, transparent 70%)`;
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
    //console.log("WARD 2 : ", PUBLIC);
    const publicInclination = PUBLIC;
    // Passe les clés des doctrines au constructeur de DebateGame
    game = new DebateGame(selectedDoctrine, opponentDoctrine, publicInclination);

    renderGameUI(game);
    //renderCraftPool(game);
    game.renderActions(game, (move) => game.handleMove(move));
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    renderDoctrineCards("player-doctrine-choice");
    document.getElementById("confirm-opponent-button").addEventListener("click", confirmOpponentChoice);
});


const philosophicalQuotes = [
    { text: "« Connais-toi toi-même »", author: "Socrate", doctrine: "universel" },
    { text: "« Ce qui ne me tue pas me rend plus fort »", author: "Nietzsche", doctrine: "nihilist" },
    { text: "« L'homme est la mesure de toute chose »", author: "Protagoras", doctrine: "universel" },
    { text: "« La vie non examinée ne vaut pas la peine d'être vécue »", author: "Socrate", doctrine: "universel" },
    { text: "« La souffrance naît du désir »", author: "Bouddha", doctrine: "buddhist" },
    { text: "« Je suis un citoyen du monde »", author: "Diogène", doctrine: "cynic" },
    { text: "« Rien n'est suffisant pour celui pour qui le suffisant est peu »", author: "Épicure", doctrine: "epicurean" },
    { text: "« Ce qui ne dépend pas de nous ne nous concerne pas »", author: "Épictète", doctrine: "stoic" }
];

function displayRandomQuote() {
    const quoteContainer = document.createElement('div');
    quoteContainer.id = 'philosophical-quote';
    quoteContainer.style.textAlign = 'center';
    quoteContainer.style.margin = '20px 0';
    quoteContainer.style.padding = '15px';
    quoteContainer.style.borderLeft = '4px solid var(--gold)';
    quoteContainer.style.background = 'rgba(26, 26, 46, 0.3)';
    quoteContainer.style.borderRadius = '8px';
    quoteContainer.style.fontStyle = 'italic';
    quoteContainer.style.animation = 'fadeIn 1s ease-out';

    const randomIndex = Math.floor(Math.random() * philosophicalQuotes.length);
    const quote = philosophicalQuotes[randomIndex];

    quoteContainer.innerHTML = `
        <p>"${quote.text}"</p>
        <p style="text-align: right; margin-top: 10px; font-size: 0.9em; color: var(--gold)">— ${quote.author}</p>
    `;

    // Insère la citation après le titre principal
    const title = document.querySelector('h1');
    if (title) {
        title.after(quoteContainer);
    }
}

// Appelle cette fonction au chargement de la page
window.addEventListener('DOMContentLoaded', displayRandomQuote);
