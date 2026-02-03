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
    document.getElementById("public-fav").style.width = game.publicFav + "%";

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
            <h3>Pool de Craft (${game.craftPool.length}/4)</h3>
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
            cardElement.innerHTML = `
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
        (move) => move.required && game.canCraftWithSelected(move)
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
            //console.log("recipe 403", recipe, allSelected, ingredientsInfo);
            recipeElement.innerHTML = `
    <div class="recipe-header">
        <div class="recipe-icon">${recipe.icon || "📜"}</div>
        <div class="recipe-info">
            <div class="recipe-name">${recipe.label}${recipe.synth ? ' ✅' : ''}</div>
            <div class="recipe-level">→ Niveau ${recipe.level}</div>
        </div>
    </div>
    <div class="recipe-ingredients">
        ${recipe.required
            .map(ingrId => {
                const card = game.craftPool.find(c => c.id === ingrId);
                const isSelected = game.selectedInPool?.some(c => c.id === ingrId);
                const cardName = card ? card.name || card.label : ingrId;
                const status = card ?
                    (isSelected ? 'selected' : 'available') :
                    'missing';
                return `<span class="ingredient ${status}">${cardName}</span>`;
            })
            .join(" + ")}
    </div>
    <button class="craft-btn" ${!allSelected || recipe.synth ? "disabled" : ""} data-recipe="${recipe.id}">
        ${recipe.synth ? "Déjà synthétisée" : allSelected ? "Créer" : "Ingrédients manquants"}
    </button>
`;

            recipeElement.querySelector(".craft-btn").addEventListener("click", () => {
                if (allSelected) {
                    game.performSynthesis(recipe.id);
                }
            });

            synthesisContainer.appendChild(recipeElement);
        });
    }
}
