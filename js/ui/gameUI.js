import { DOCTRINES } from "../doctrines.js";
import { createElement } from "../utils.js";
import { updateFighterCard } from "./fighterUI.js";
import "../classes/DebateGame.js";

export function renderGameUI(game) {
    // Mise à jour des cartes des combattants
    updateFighterCard(game);

    // Mise à jour des jauges
    document.getElementById("p1-health").style.width = game.p1.health + "%";
    document.getElementById("p1-focus").style.width = game.p1.focus + "%";
    document.getElementById("p2-health").style.width = game.p2.health + "%";
    document.getElementById("p2-focus").style.width = game.p2.focus + "%";
    document.getElementById("public-fav-fill").style.width = game.publicFav + "%";

    // Mise à jour des valeurs
    document.getElementById("p1-health-val").textContent = Math.round(game.p1.health);
    document.getElementById("p1-focus-val").textContent = Math.round(game.p1.focus);
    document.getElementById("p2-health-val").textContent = Math.round(game.p2.health);
    document.getElementById("p2-focus-val").textContent = Math.round(game.p2.focus);
    document.getElementById("public-percent").textContent = Math.round(game.publicFav) + "%";
}
export function renderCraftPool(game) {
    const poolContainer = document.getElementById("craft-pool");
    if (!poolContainer) {
        console.warn("Conteneur 'craft-pool' non trouvé. Ajoutez-le à votre HTML.");
        return;
    }

    // Structure HTML de base
    poolContainer.innerHTML = `
        <div class="craft-section">
            <h2>🔧 Atelier Dialectique (${game.craftPool.length}/4)</h2>
            <h3>Corpus</h3>
            <div class="pool-cards" id="pool-cards-container"></div>

            <h3>Synthèses Possibles</h3>
            <div class="synthesis-results" id="synthesis-results-container"></div>
        </div>
    `;

    const poolCardsContainer = document.getElementById("pool-cards-container");
    const synthesisContainer = document.getElementById("synthesis-results-container");
    //console.warn("renderCraftPool", game.craftPool);
    // 1. Affiche les cartes du pool
    if (game.craftPool.length === 0) {
        poolCardsContainer.innerHTML = "<p class='empty-message'>Aucune carte dans le pool de craft.</p>";
    } else {
        game.craftPool.forEach((card) => {
            const isSelected = game.selectedInPool?.some((c) => c.id === card.id);
            //console.log("Dernière carte sélectionnée", card);
            const cardElement = document.createElement("div");
            cardElement.className = `pool-card ${isSelected ? "selected" : ""}`;
            cardElement.dataset.id = card.id;
            // Utilisation de l'image depuis doctrine.js
            const cardImage = card.image || getDefaultImageForLevel(card.level);

            cardElement.innerHTML = `
                <img class="card-image" src="${cardImage}" alt="${card.name || card.label}">
                <div class="card-content">
                    <div class="card-icon">${card.icon || "📄"}</div>
                    <div class="card-name">${card.name || card.label}</div>
                    <div class="card-level">Niveau ${card.level}</div>
                </div>
                <button class="remove-btn" data-id="${card.id}">❌</button>
            `;

            // Gestion des événements
            cardElement.addEventListener("click", (e) => {
                if (e.target.classList.contains("remove-btn")) return;
                game.togglePoolSelection(card);
                renderCraftPool(game);
            });

            cardElement.querySelector(".remove-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                game.removeFromCraftPool(card.id);
                renderCraftPool(game);
            });

            poolCardsContainer.appendChild(cardElement);
        });
    }

    // 2. Affiche les synthèses possibles
    const possibleRecipes = game.playerDoctrine.moves.filter(
        (move) => move.required && game.canCraftWithSelected(move) && move.level > 1
    );

    if (possibleRecipes.length === 0) {
        synthesisContainer.innerHTML =
            "<p class='empty-message'>Aucune synthèse possible avec la sélection actuelle</p>";
    } else {
        possibleRecipes.forEach((recipe) => {
            const recipeElement = document.createElement("div");
            recipeElement.className = "synthesis-card";
            recipeElement.dataset.id = recipe.id;

            // Vérifie quelles cartes requises sont disponibles
            const ingredientsInfo = recipe.required.map((ingrId) => {
                const card = game.craftPool.find((c) => c.id === ingrId);
                const isSelected = game.selectedInPool?.some((c) => c.id === ingrId);
                return {
                    name: card ? card.name : ingrId,
                    available: !!card,
                    selected: isSelected
                };
            });

            // Vérifie si toutes les cartes requises sont sélectionnées
            const allSelected = ingredientsInfo.every((ingr) => ingr.selected);
            console.log("recipe 403", recipe, allSelected, ingredientsInfo);

            let weight = game.calculateEfficiency(game.selectedInPool, recipe);
            // Utilisation de l'image de la recette depuis doctrine.js
            const recipeImage = recipe.image || getDefaultImageForLevel(recipe.level);

            recipeElement.innerHTML = `
                <img class="recipe-image" src="${recipeImage}" alt="${recipe.label}">
                <div class="recipe-header">
                    <div class="recipe-icon">${recipe.icon || "📜"}</div>
                    <div class="recipe-info">
                        <div class="recipe-name">${recipe.label}</div>
                        <div class="recipe-level">→ Niveau ${recipe.level}</div>
                        <div class="recipe-stats">
                            <span>💥 ${recipe.baseDmg || 0}</span>
                            <span>🎯 ${Math.round((recipe.precision || 0) * 100)}%</span>
                            <span>🧠 ${recipe.focus || 0}</span>
                            <span>⚖️ ${weight.toFixed(1) || 0}</span>
                        </div>
                    </div>
                </div>
                <div class="recipe-ingredients">
                    ${recipe.required
                        .map((ingrId) => {
                            const card = game.craftPool.find((c) => c.id === ingrId);
                            const isSelected = game.selectedInPool?.some((c) => c.id === ingrId);
                            const cardName = card ? card.name || card.label : ingrId;
                            const status = card ? (isSelected ? "selected" : "available") : "missing";
                            return `
                                <div class="ingredient ${status}" data-tooltip="${getIngredientTooltip(card, ingrId)}">
                                    ${cardName}
                                </div>
                            `;
                        })
                        .join(" + ")}
                </div>
                <button class="craft-btn" ${!allSelected || recipe.synth ? "disabled" : ""} data-recipe="${recipe.id}">
                    ${recipe.synth ? "✅ Déjà maîtrisé" : allSelected ? "🔨 Forger" : "Ingrédients manquants"}
                </button>
            `;
            
            /*recipeElement.innerHTML = `
    <div class="recipe-header">
        <div class="recipe-icon">${recipe.icon || "📜"}</div>
        <div id="recipeInfo" class="recipe-info">
            <div class="recipe-name">${recipe.label}</div>
            <div class="recipe-level">→ Niveau ${recipe.level}</div>
            <div  class="recipe-stats">
                <span>💥 ${recipe.baseDmg || 0}</span>
                <span>🎯 ${Math.round((recipe.precision || 0) * 100)}%</span>
                <span>🧠 ${recipe.focus || 0}</span>
                <span>⚖️ ${weight.toFixed(1) || 0}</span>
            </div>
        </div>
    </div>
    <div class="recipe-ingredients">
        ${recipe.required
            .map((ingrId) => {
                const card = game.craftPool.find((c) => c.id === ingrId);
                const isSelected = game.selectedInPool?.some((c) => c.id === ingrId);
                const cardName = card ? card.name || card.label : ingrId;
                const status = card ? (isSelected ? "selected" : "available") : "missing";
                return `
                <div class="ingredient ${status}" data-tooltip="${getIngredientTooltip(card, ingrId)}">
                    ${cardName}
                </div>
            `;
            })
            .join(" + ")}
    </div>
    <button class="craft-btn" ${!allSelected || recipe.synth ? "disabled" : ""} data-recipe="${recipe.id}">
        ${recipe.synth ? "✅ Déjà maîtrisé" : allSelected ? "🔨 Forger" : "Ingrédients manquants"}
    </button>
`;*/

            recipeElement.querySelector(".craft-btn").addEventListener("click", () => {
                if (allSelected) {
                    game.performSynthesis(recipe.id);
                }
            });

            synthesisContainer.appendChild(recipeElement);
        });
    }
}

// Fonction utilitaire pour obtenir une image par défaut selon le niveau
function getDefaultImageForLevel(level) {
    const defaultImages = {
        1: "../images/default_level1.png",
        2: "../images/default_level2.png",
        3: "../images/default_level3.png"
    };
    return defaultImages[level] || "../images/default_argument.png";
}

// Fonction utilitaire pour obtenir des infobulles sur les ingrédients
function getIngredientTooltip(card, ingrId) {
    if (!card) return `Ingrédient manquant: ${ingrId}`;
    return `${card.name || card.label}\nNiveau: ${card.level}\n${card.description || ""}`;
}

// Ajoute les styles CSS pour les images des cartes


/*function getIngredientTooltip(card, ingrId) {
    if (!card) return `Ingrédient manquant: ${ingrId}`;

    return `
        <strong>${card.name || card.label}</strong><br>
        Niveau: ${card.level || 1}<br>
        ${card.passed ? "✅ Argument réussi" : "❌ Argument échoué"}<br>
        Poids: ${card.weight || 0}<br>
        ${card.gameplay ? `Effet: ${card.gameplay.substring(0, 50)}...` : ""}
    `;
}*/

export function animateAttack(attacker, target) {
    const attackerCard = document.getElementById(`${attacker}-card`);
    const targetCard = document.getElementById(`${target}-card`);

    if (!attackerCard || !targetCard) return;

    // Crée un effet de lumière
    const light = document.createElement("div");
    light.style.position = "fixed";
    light.style.width = "100px";
    light.style.height = "100px";
    light.style.background = "radial-gradient(circle, rgba(255,183,3,0.8) 0%, transparent 70%)";
    light.style.borderRadius = "50%";
    light.style.pointerEvents = "none";
    light.style.zIndex = "1000";
    light.style.opacity = "0";
    light.style.transition = "opacity 0.5s";

    document.body.appendChild(light);

    // Positionne la lumière sur l'attaquant
    const attackerRect = attackerCard.getBoundingClientRect();
    light.style.left = `${attackerRect.left + attackerRect.width / 2 - 50}px`;
    light.style.top = `${attackerRect.top + attackerRect.height / 2 - 50}px`;
    light.style.opacity = "1";

    // Anime le mouvement vers la cible
    setTimeout(() => {
        const targetRect = targetCard.getBoundingClientRect();
        light.style.left = `${targetRect.left + targetRect.width / 2 - 50}px`;
        light.style.top = `${targetRect.top + targetRect.height / 2 - 50}px`;
        light.style.background = "radial-gradient(circle, rgba(230,57,70,0.8) 0%, transparent 70%)";
    }, 10);

    // Supprime après l'animation
    setTimeout(() => {
        light.style.opacity = "0";
        setTimeout(() => light.remove(), 500);
    }, 500);
}

/*export function renderPublicFavBar(game) {
    console.log("211 : ", game);
    const favBar = document.getElementById("public-fav");
    const thresholds = document.getElementById("victory-thresholds");

    // Calcul des seuils
    const playerThreshold = 100 - game.turnCount;
    const opponentThreshold = game.turnCount;

    // Mise à jour de la jauge avec des indicateurs de seuil
    favBar.style.background = `
        linear-gradient(90deg,
            var(--danger) 0%,
            var(--danger) ${opponentThreshold}%,
            var(--warning) ${opponentThreshold}%,
            var(--warning) ${playerThreshold}%,
            var(--success) ${playerThreshold}%,
            var(--success) 100%
        )
    `;

    // Ajouter des marqueurs visuels
    console.log("231 : ",opponentThreshold,playerThreshold,game.publicFav);
    const markers = document.createElement("div");
    markers.className = "fav-markers";
    markers.innerHTML = `
        <div class="marker opponent" style="left: ${opponentThreshold+game.publicFav}%"></div>
        <div class="marker player" style="left: ${playerThreshold}%"></div>
    `;
    favBar.appendChild(markers);
}*/
