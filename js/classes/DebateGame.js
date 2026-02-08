import { DOCTRINES, PUBLIC, STOIC_MOVES } from "../doctrines.js";
import { Philosopher } from "./Philosopher.js";
import { renderGameUI, renderCraftPool, animateAttack } from "../ui/gameUI.js";

// Helper pour vérifier les sous-ensembles (à placer en haut du fichier)
Set.prototype.isSubset = function (set) {
    return [...this].every((item) => set.has(item));
};

export class DebateGame {
    constructor(playerDoctrineKey, opponentDoctrineKey, publicInc) {
        document.documentElement.style.setProperty("--victory-threshold", "100%");
        document.documentElement.style.setProperty("--defeat-threshold", "0%");
        document.documentElement.style.setProperty("--current-fav", "50%");
        // Utilise les clés pour accéder aux doctrines
        this.playerDoctrine = DOCTRINES[playerDoctrineKey];
        this.opponentDoctrine = DOCTRINES[opponentDoctrineKey];
        this.publicInclination = publicInc;

        this.isEnemyTurn = false;

        // Stocke les clés des doctrines pour les comparaisons futures
        this.playerDoctrineKey = playerDoctrineKey;
        this.opponentDoctrineKey = opponentDoctrineKey;

        // Initialisation des combattants
        this.p1 = new Philosopher("Joueur", this.playerDoctrine);
        this.p2 = new Philosopher("Adversaire", this.opponentDoctrine);

        // Initialisation des propriétés du jeu
        this.publicFav = this.publicFav || 50;
        this.publicCredit = this.publicCredit || 0;
        this.currentLevel = 1;
        this.isCounter = false;
        this.gameOver = false;
        this.reminiscenceUsed = false;
        this.turnCount = 1;
        this.damageDealt = 0;
        this.argumentsSuccessful = 0;

        // Propriétés de tour
        this.currentAtk = null;
        this.currentDef = null;

        // Mise à jour de l'UI
        this.updateUI();
        this.renderActions();
        this.showTurnIndicator("p1");

        this.usedArguments = []; // Cartes consommées

        this.ensureUIContainers(); // Crée les conteneurs si nécessaire

        this.craftPool = []; // Pool de craft pour stocker les cartes sélectionnées
        this.selectedInPool = []; // Initialise la sélection
        this.synthesisResults = [];
    }

    randElement(array) {
        //console.log("randElement : ", array);
        //console.log("randElement.length : ", array.length);
        let i = Math.round(Math.random() * (array.length - 1));
        //console.log(i, array[i]);
        return array[i];
    }

    ensureUIContainers() {
        // Conteneur pour la main du joueur
        if (!document.getElementById("player-hand")) {
            const handContainer = document.createElement("div");
            handContainer.id = "player-hand";
            handContainer.className = "cards-container";
            document.getElementById("game-container").appendChild(handContainer);
        }

        // Conteneur pour les recettes
        if (!document.getElementById("recipes-container")) {
            const recipesContainer = document.createElement("div");
            recipesContainer.id = "recipes-container";
            recipesContainer.className = "recipes-container";
            document.getElementById("game-container").appendChild(recipesContainer);
        }
    }

    showTurnIndicator(player) {
        document.getElementById("p1-turn").style.display = player === "p1" ? "block" : "none";
        document.getElementById("p2-turn").style.display = player === "p2" ? "block" : "none";
        document.getElementById("p1-card").classList.toggle("active", player === "p1");
        document.getElementById("p2-card").classList.toggle("active", player === "p2");
    }

    showDamagePopup(damage, x, y, color) {
        const popup = document.createElement("div");
        popup.className = "damage-popup";
        popup.textContent = `-${damage}`;
        popup.style.color = color;
        popup.style.left = x + "px";
        popup.style.top = y + "px";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
    }

    log(msg, color = "#eee") {
        const l = document.getElementById("log");
        const entry = document.createElement("div");
        entry.className = "log-entry";
        entry.style.color = color;
        entry.innerHTML = `<strong>►</strong> ${msg}`;
        l.insertBefore(entry, l.firstChild);
    }

    verbatim(q, isPlayer = true) {
        const v = document.getElementById("verbatim");
        const entry = document.createElement("div");
        entry.className = "verbatim-entry";
        entry.textContent = q;

        // Applique la couleur en fonction du personnage
        if (this.isEnemyTurn === false) {
            entry.style.color = "var(--player-color)";
            entry.style.borderLeft = "3px solid var(--player-color)";
        } else {
            entry.style.color = "var(--enemy-color)";
            entry.style.borderLeft = "3px solid var(--enemy-color)";
        }

        v.insertBefore(entry, v.firstChild);
    }

    // Calcule l'efficacité de la combinaison (poids total)
    calculateEfficiency(selectedCards, recipe) {
        let totalWeight = 0;
        //console.log("123", recipe);
        selectedCards.forEach((card) => {
            let incA = card.inclination;
            let incB = recipe.inclination;
            totalWeight += this.produitScalaire(incA, incB);

            console.log("129", incA, incB, card, totalWeight);
        });
        //console.log("131", totalWeight);
        return totalWeight;
    }

    updateComboDots() {
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`dot${i}`);
            dot.classList.toggle("active", i <= this.currentLevel);
        }
    }

    // Méthode pour ajouter une carte au pool de craft
    addToCraftPool(card) {
        // Vérifie si la carte n'est pas déjà dans le pool
        if (!this.craftPool.some((c) => c.id === card.id)) {
            this.craftPool.push(card);
            this.log(`✅ ${card.label} ajouté au pool de craft.`, "#2a9d8f");
        } else {
            this.log(`⚠️ ${card.label} est déjà dans le pool de craft.`, "#ff7675");
        }
        renderCraftPool(this);
    }

    // Méthode pour retirer une carte du pool de craft
    removeFromCraftPool(cardId) {
        const index = this.craftPool.findIndex((c) => c.id === cardId);
        if (index !== -1) {
            const card = this.craftPool[index];
            this.craftPool.splice(index, 1);
            this.log(`❌ ${card.label} retiré du pool de craft.`, "#e63946");
        }
    }

    // Fonction utilitaire pour obtenir la couleur de niveau
    getLevelColor(level) {
        switch (level) {
            case 1:
                return "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)";
            case 2:
                return "linear-gradient(135deg, #457b9d 0%, #335d7a 100%)";
            case 3:
                return "linear-gradient(135deg, #d63031 0%, #a02020 100%)";
            default:
                return "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)";
        }
    }

    renderActions() {
        const panel = document.getElementById("action-panel");
        panel.innerHTML = "";

        const moves = this.p1.doctrine.moves;
        const effectiveBase = this.publicFav > 65 ? 2 : 1;

        moves.forEach((move) => {
            const btn = document.createElement("button");

            // Détermination de l'état du bouton
            const canUse =
                (move.synth === true && this.p1.focus >= move.focus) ||
                (move.level === 1 && this.p1.focus >= move.focus) ||
                (move.level <= this.currentLevel && this.p1.focus >= move.focus);

            // Classes CSS basées sur le niveau et l'état
            let levelClass = "";
            if (move.level === 2) levelClass = "level-2";
            if (move.level === 3) levelClass = "level-3";
            //if (move.synth) levelClass += " special";

            // Structure de base du bouton
            btn.innerHTML = `
    <div class="button-content">
        <div class="button-main">
            <span class="button-level">N${move.level}</span>
            <span class="button-label">${move.label}</span>
        </div>
        <table class="button-stats-table">
            <tr>
                ${
                    move.baseDmg || move.dmg || move.dmg === 0
                        ? `
                <td class="stat stat-dmg">
                    <span class="stat-icon">💥</span>
                    <span class="stat-value">${move.baseDmg || move.dmg || 0}</span>
                </td>`
                        : ""
                }
                <td class="stat stat-prec">
                    <span class="stat-icon">🎯</span>
                    <span class="stat-value">${Math.round((move.precision || move.prec || 0) * 100)}%</span>
                </td>
                <td class="stat stat-focus">
                    <span class="stat-icon">🧠</span>
                    <span class="stat-value">${move.focus || 0}</span>
                </td>
                ${
                    move.weight
                        ? `
                <td class="stat stat-weight">
                    <span class="stat-icon">⚖️</span>
                    <span class="stat-value">${move.weight.toFixed(1)}</span>
                </td>`
                        : ""
                }
            </tr>
        </table>
    </div>
`;

            // Gestion visuelle selon l'état
            if ((canUse && move.synth === true) || move.level <= 1) {
                // Action synthétisée et utilisable: affiche l'image
                btn.className = `action-btn unlocked ${levelClass}`;
                if (move.image) {
                    btn.style.backgroundImage = `url(${move.image})`;
                    btn.style.backgroundSize = "cover";
                    btn.style.backgroundPosition = "center";
                    btn.classList.add("has-bg-image");
                }
                // Effet de survol: retourne au fond uni
                btn.addEventListener("mouseenter", () => {
                    btn.style.backgroundImage = "none";
                    btn.style.background = this.getLevelColor(move.level);
                });

                btn.addEventListener("mouseleave", () => {
                    if (move.image) {
                        //console.log(move);
                        btn.style.backgroundImage = `url(${move.image})`;
                        btn.style.backgroundSize = "cover";
                        btn.style.backgroundPosition = "center";
                        btn.classList.add("has-bg-image");
                    }
                });
            } else if (move.level <= this.currentLevel) {
                // Action disponible mais non synthétisée: fond uni de niveau
                btn.className = `action-btn ${levelClass}`;
                btn.style.background = this.getLevelColor(move.level);
                btn.style.opacity = "0.8";

                // Effet de survol: légèrement plus clair
                btn.addEventListener("mouseenter", () => {
                    btn.style.opacity = "1";
                    btn.style.transform = "scale(1.02)";
                });

                btn.addEventListener("mouseleave", () => {
                    btn.style.opacity = "0.8";
                    btn.style.transform = "scale(1)";
                });
            } else if (move.synth === false && move.level >= 2) {
                // Action non disponible: fond uni atténué
                btn.className = `action-btn ${levelClass} locked`;
                btn.style.background = this.getLevelColor(move.level);
                btn.style.opacity = "0.5";
            }

            btn.disabled = !canUse || this.gameOver;

            // Gestion du clic
            btn.onclick = () => {
                if (move.required) {
                    if (move.synth === true) {
                        this.handleMove(move);
                    } else if (this.canCraftWithSelected(move)) {
                        this.log(`✨ Vous pouvez crafter ${move.label} !`, "#a29bfe");
                        this.handleMove(move);
                    } else {
                        this.log(`⚠️ Il manque des ingrédients pour ${move.label}.`, "#ff7675");
                    }
                } else {
                    this.handleMove(move);
                    renderCraftPool(this);
                }
            };

            panel.appendChild(btn);
        });

        this.addSpecialAbilityButtons(panel);
    }

    logMoveSuccess(move, dmg, doctrine) {
        const doctrineInfo = DOCTRINES[doctrine];
        if (doctrineInfo && doctrineInfo.logMessage) {
            this.log(doctrineInfo.logMessage(move, dmg), doctrineInfo.color);
        } else {
            this.log(`✓ ${move.label} porte un coup décisif ! Dégâts: ${dmg}`, doctrineInfo?.color || "#eee");
        }

        let quote = this.randElement(move.quotes);
        //console.log("Joueur quote : ", quote);
        const isPlayer = this.verbatim(`${doctrineInfo?.verbatimPrefix || ""}${quote}`, isPlayer);
    }

    logHeal(move, heal, doctrine) {
        const doctrineInfo = DOCTRINES[doctrine];
        if (doctrineInfo && doctrineInfo.healLogMessage) {
            this.log(doctrineInfo.healLogMessage(move, heal), "#2a9d8f");
        } else {
            this.log(`💖 ${move.label} : Soigne ${heal} points de vitalité.`, "#2a9d8f");
        }
        let quote = this.randElement(move.quotes);
        this.verbatim(`${doctrineInfo?.verbatimPrefix || ""}${quote}`);
    }
    // Adapter à chaque type de move
    logOpponentMove(name, move, dmg, doctrine) {
        const doctrineInfo = DOCTRINES[doctrine];
        if (doctrineInfo && doctrineInfo.opponentLogMessage) {
            this.log(doctrineInfo.opponentLogMessage(name, move, dmg), "#e63946");
        } else {
            this.log(`⚔️ ${name} utilise ${move.label} ! Dégâts: ${dmg}`, "#e63946");
        }
        let quote = this.randElement(move.quotes);
        //console.log("Ennemi quote : ", quote);
        this.verbatim(`${doctrineInfo?.verbatimPrefix || ""}${quote}`);
    }

    /**
     * Met à jour une carte existante après craft (ne crée pas de nouvelle carte).
     * @param {string} recipeId - ID de la recette à débloquer.
     * @param {number} weight - Poids calculé.
     */
    unlockRecipe(recipeId, weight) {
        const recipe = this.playerDoctrine.moves.find((m) => m.id === recipeId);
        if (!recipe) return;

        // Met à jour la carte existante (ne la duplique pas)
        recipe.unlocked = true;
        recipe.weight = weight;
        recipe.level = this.currentLevel + 1; // Niveau supérieur
    }

    /**
     * Sélectionne/déselectionne une carte dans le pool de craft
     */
    togglePoolSelection(card) {
        const index = this.selectedInPool.findIndex((c) => c.id === card.id);
        if (index === -1) {
            this.selectedInPool.push(card);
        } else {
            this.selectedInPool.splice(index, 1);
        }
        this.updateSynthesisResults();
        console.log("SelectedInPool", this.selectedInPool);
    }

    /**
     * Met à jour les résultats de synthèse possibles
     */
    updateSynthesisResults() {
        this.synthesisResults = this.playerDoctrine.moves.filter(
            (move) => move.required && this.canCraftWithSelected(move)
        );
    }

    /**
     * Vérifie si une recette peut être craftée avec les cartes sélectionnées
     */
    canCraftWithSelected(recipe) {
        //console.warn("canCraftWithSelected");
        if (!recipe || !recipe.required || !this.selectedInPool) {
            return false;
        }
        // Vérifie que toutes les cartes requises sont présentes dans selectedInPool
        const canCraft = recipe.required.every((requiredId) =>
            this.selectedInPool.some((card) => card.id === requiredId)
        );
        return canCraft;
    }

    /**
     * Effectue la synthèse dialectique
     * @param {string} recipeId - L'ID de la recette à synthétiser
     */
    performSynthesis(recipeId) {
        console.log("320", recipeId);
        const recipe = this.p1.doctrine.moves.find((m) => m.id === recipeId);
        if (!recipe) {
            this.log("⚠️ Recette introuvable.", "#e63946");
            return;
        }

        // Vérifie une dernière fois que la synthèse est possible
        if (!this.canCraftWithSelected(recipe)) {
            this.log("⚠️ La synthèse n'est plus possible (ingrédients manquants).", "#ff7675");
            return;
        }

        // Calcule le poids
        console.log("333", this.selectedInPool, recipe);
        //const efficiency = this.calculateEfficiency(this.selectedInPool, recipe);
        let efficiency = 0;
        // Consomme les cartes du pool
        efficiency = this.calculateEfficiency(this.selectedInPool, recipe);
        /*this.selectedInPool.forEach((card) => {
            const index = this.craftPool.findIndex((c) => c.id === card.id);
            console.log("341", card, recipe);
            efficiency += this.produitScalaire(card.inclination, recipe.inclination);
            if (index !== -1) {
                this.craftPool.splice(index, 1);
            }
        });*/
        this.selectedInPool.forEach((card) => {
            this.removeFromCraftPool(card.id);
        });
        this.selectedInPool = [];

        // Met simplement synth à true dans la recette existante
        recipe.synth = true;

        //console.log("662 : move synth", recipe, this.p1.doctrine.moves, this.playerDoctrine.moves);

        // Met à jour le poids de la recette
        recipe.weight = efficiency;

        this.log(`✨ Synthèse réussie: ${recipe.label} (Poids: ${efficiency.toFixed(1)})`, "#a29bfe");

        renderCraftPool(this);
        this.renderActions(this, this.handleMove.bind(this));
    }

    handleMove(move) {
        this.currentAtk = move;
        this.currentDef = this.publicInclination;

        let incA = this.currentAtk.inclination;
        let incB = this.currentDef.inclination;
        let res = this.currentDef.res || 0;

        if (this.p1.aporie > 0) {
            if (Math.random() < 0.35) {
                this.log("🌀 L'Aporie vous paralyse ! Votre esprit se perd dans ses contradictions...", "#ff7675");
                this.p1.aporie--;
                this.endTurn();
                return;
            } else {
                this.log("✨ Vous surmontez l'Aporie par un effort de volonté !", "#a29bfe");
                this.p1.aporie--;
            }
        }

        this.p1.focus -= move.focus;
        let chance = move.precision || move.prec;
        this.addToCraftPool(move);

        if (this.isCounter) {
            chance = Math.min(0.98, chance + 0.15);
            this.log("⚡ Parade activée ! Précision augmentée !", "cyan");
            document.getElementById("counter-badge").style.display = "none";
        }

        if (Math.random() < chance) {
            //this.addToCraftPool(move);
            this.log(`🖋️ Votre argument (${move.label}) est passé !`, "#457b9d");
            //console.warn("714 PSD : ", move);

            let psd = move.passed; //this.p1.doctrine.moves[move].passed;
            if (!psd || psd === false) {
                psd = true;
                //console.warn("719 PSD rendu true");
            } else {
                //console.warn("723 PSD déjà true");
            }

            let dmg = move.baseDmg || move.dmg || 0;
            let heal = move.heal || 0;
            let shield = move.shield || 0;

            if (this.p2.shield > 0 && dmg > 0) {
                const blocked = Math.min(this.p2.shield, dmg);
                dmg -= blocked;
                this.p2.shield -= blocked;
                this.log(`🛡️ Bouclier absorbe ${blocked} dégâts !`, "#457b9d");
            }
            let verbatimUsed = false;
            if (dmg > 0 && verbatimUsed === false) {
                this.p2.health -= dmg;
                this.damageDealt += dmg;
                this.argumentsSuccessful++;
                //console.warn(incA,incB,dmg,res);
                this.publicFavUpdate(incA, incB, dmg, (res = 0)); // Appel aux inclinations (vecteurs donc tableaux, de dimensions N, N nombre de types de dégâts)
                let quote = this.randElement(move.quotes);
                this.verbatim(`${this.playerDoctrine.verbatimPrefix} : ${quote}`);
                verbatimUsed = true;
                const cardRect = document.getElementById("p2-card").getBoundingClientRect();
                this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");
            } else if (heal > 0 && verbatimUsed === false) {
                this.p1.health = Math.min(100000, this.p1.health + heal);
                this.logHeal(move, heal, this.playerDoctrineKey);
                let quote = this.randElement(move.quotes);
                this.verbatim(`${this.playerDoctrine.verbatimPrefix} : ${quote}`);
                verbatimUsed = true;
            } else if (shield > 0 && verbatimUsed === false) {
                this.p1.shield = shield;
                this.log(`🛡️ ${move.label} : Bouclier activé (${shield}).`, this.playerDoctrine.color);
                let quote = this.randElement(move.quotes) || move.quote;
                this.verbatim(`${this.playerDoctrine.verbatimPrefix}${quote}`);
                verbatimUsed = true;
            } else if (move.level === 3 && Math.random() < 0.6) {
                this.p2.aporie = 2;
                this.log("🌀 Votre adversaire est plongé dans une Aporie philosophique !", "#a29bfe");
            }
            animateAttack("p1", "p2");
            this.currentLevel = Math.min(3, move.level + 1);
            this.isCounter = false;
        } else {
            this.log("✗ Argument réfuté par l'adversaire. Retour aux fondamentaux.", "#888");
            this.currentLevel = 1;
            //console.warn(incA,incB,dmg,res);
            this.publicFavUpdate(incA, incB, 0, (res = 0));
            // this.publicFav = Math.max(0, this.publicFav - 5);
            this.isCounter = false;
        }
        /* const p2Card = document.getElementById('p2-card');
    p2Card.classList.add('attacking');
    setTimeout(() => p2Card.classList.remove('attacking'), 500);

    const healthBar = document.getElementById('p2-health');
    healthBar.classList.add('damaged');
    healthBar.style.setProperty('--target-width', `${this.p1.health}%`);
    setTimeout(() => healthBar.classList.remove('damaged'), 1000);*/

        this.updateComboDots();
        this.endTurn();
    }

    produitScalaire(incA, incB) {
        //console.log("767", incA, incB);
        let result = 0;
        let produitScalaire = 0;
        //console.log("WARN : ", incA);
        for (const key in incA) {
            if (incB.hasOwnProperty(key)) {
                //console.log("PS incA incB : ", incA, incB);
                result = incA[key] * incB[key];
                produitScalaire += result;
            } else {
                console.warn(`Clé "${key}" manquante dans le deuxième objet.`);
            }
        }
        //console.log("780 Produit Scalaire : ", produitScalaire);
        return produitScalaire;
    }

    functionLogistique(credit) {
        //console.log("Credit avant : ", credit);
        let lambda = 0.01;
        let result = (1 / (1 + Math.exp(-lambda * credit))) * 100;
        //console.log("UPDATE publicFav : ", result);
        return result;
    }

    // Inclination est un vecteur de dimension N avec N le nombre de types de concepts,
    publicFavUpdate(inclinationA, inclinationB, dmg, res) {
        let publicFavAvant = this.publicFav;
        let creditAvant = this.publicCredit;
        let credit = creditAvant;
        if (this.isEnemyTurn) {
            credit -= dmg * this.produitScalaire(inclinationA, inclinationB);
        } else {
            credit += dmg * this.produitScalaire(inclinationA, inclinationB);
        }
        this.publicCredit = credit;

        let publicFav = this.functionLogistique(credit);

        let deltaCredit = credit - creditAvant;
        let deltaPublicFav = publicFav - publicFavAvant;
        //console.log("DeltaCredit : ", deltaCredit + " DeltaPublicFav : ", deltaPublicFav);
        this.publicFav = publicFav;

        // DEBUG
        /* console.log(
            "Crédit avant : " +
                creditAvant +
                " " +
                "crédit actuel : " +
                this.publicCredit +
                " " +
                "publicFavAvant : " +
                publicFavAvant +
                " " +
                "publicFav actuelle : " +
                this.publicFav
        );*/
        if (deltaPublicFav >= 0) {
            this.log(`Vous gagnez : ${deltaPublicFav.toFixed(1)}% de faveur du public"`);
        } else if (deltaPublicFav < 0) {
            this.log(`Vous perdez : ${-deltaPublicFav.toFixed(1)}% de faveur du public"`);
        }
        this.updateUI();
        this.updatePublicFavUI();
        // Mise à jour de l'UI des seuils
        //this.displayVictoryThresholds();
        // Vérifier la victoire après la mise à jour
        this.checkPublicVictory();

        renderGameUI(this);
    }

    // Fonction de scoring
    scoreMove(moves, gameState) {
        moves.forEach((m) => {
            //console.log(this.currentLevel);
            if (!m.weight) {
                m.weight = 1;
            }
            if (m.level === this.currentLevel && m.weight) {
                m.weight = 100;
            } else if (m.level < this.currentLevel && m.weight) {
                m.weight = 10;
            } else if (m.level > this.currentLevel && m.weight) {
                m.weight = 0;
            }
        });
        //console.log(moves);
    }

    selectMove(moves, gameState) {
        //const doctrine = doctrines[doctrineKey];
        //const moves = doctrine.moves;
        // Trie les mouvements par score décroissant
        this.scoreMove(moves, this);
        moves.sort((a, b) => b.weight - a.weight);

        // Choisit le mouvement avec le score le plus élevé
        //console.log("Sélection, moves", moves[0], moves);
        return moves[0];
    }

    opponentTurn() {
        this.isEnemyTurn = true;
        this.showTurnIndicator("p2");

        setTimeout(() => {
            if (this.gameOver) return;

            // Gestion de l'Aporie adverse
            if (this.p2.aporie > 0 && Math.random() < 0.35) {
                this.log("🌀 L'adversaire est paralysé par l'Aporie !", "#ff7675");
                this.p2.aporie--;
                this.showTurnIndicator("p1");
                //this.turnCount++;
                document.getElementById("turn-counter").textContent = `Tour: ${this.turnCount}`;
                this.renderActions();
                return;
            }

            // Sélection des mouvements en fonction de la doctrine adverse
            const opponentDoctrine = this.opponentDoctrine;
            const moves = opponentDoctrine.moves;

            // Logique de sélection du mouvement
            let move = moves[0]; // Par défaut, sélectionne le premier mouvement
            //console.warn("TOUR ENNEMI", move, opponentDoctrine, moves);
            //console.warn(this.currentLevel);
            this.selectMove(moves, DebateGame);
            // Vérifie que move n'est pas null
            if (!move) {
                move = moves[0]; // Par défaut, utilise le premier mouvement si aucun n'est sélectionné
            }
            const opponentDoctrineName = opponentDoctrine.verbatimPrefix.trim();
            this.currentAtk = move;
            this.currentDef = this.publicInclination;

            let incA = this.currentAtk.inclination;
            let incB = this.currentDef.inclination;
            let res = this.currentDef.res || 0;

            //console.warn("TOUR ENNEMI", move, opponentDoctrineName, incA,incB,res);

            // Gestion des effets de l'adversaire
            if (move.heal) {
                this.p2.health = Math.min(100000, this.p2.health + move.heal);
                this.log(`💖 ${this.p2.name} utilise ${move.label} et se soigne de ${move.heal} points.`, "#2a9d8f");
                let quote = this.randElement(move.quotes);
                //console.warn(move, quote);
                this.verbatim(`${opponentDoctrineName} : ${quote}`);
            }
            if (move.shield) {
                const success = Math.random() < (move.precision || move.prec);
                if (success) {
                    this.log(`🖋️ Rétorsion dialectique, l'argument adverse est passé ! (BOUCLIER)`, "#ff2c2c");
                    const dmg = move.baseDmg || move.dmg || 0;
                    this.p1.health -= dmg;
                    this.p2.shield = move.shield;

                    // this.publicFavUpdate(incA, incB, 0, (res = 0));

                    const cardRect = document.getElementById("p1-card").getBoundingClientRect();
                    this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");

                    this.log(
                        `🛡️ ${this.p2.name} utilise ${move.label} ! Dégâts: ${dmg} | Bouclier: ${move.shield}`,
                        "#e63946"
                    );
                    let quote = this.randElement(move.quotes);
                    //console.warn(opponentDoctrineName, quote);
                    this.verbatim(`${opponentDoctrineName} : ${quote}`);
                    this.publicFavUpdate(incA, incB, 0, (res = 0));
                    this.updatePublicFavUI();
                    //this.updatePublicFavThresholds();
                    this.checkPublicVictory();
                    this.isCounter = false;
                } else {
                    this.log("⚡ Vous parez l'attaque ! Parade possible au prochain tour !", "cyan");
                    this.isCounter = true;
                    document.getElementById("counter-badge").style.display = "block";
                }
            }
            if (move.dmg || move.baseDmg) {
                const success = Math.random() < (move.precision || move.prec);
                if (success) {
                    const dmg = move.baseDmg || move.dmg || 0;
                    this.p1.health -= dmg;
                    this.log(`🖋️ Rétorsion dialectique, l'argument adverse est passé ! (ATTAQUE)`, "#ff2c2c");

                    const cardRect = document.getElementById("p1-card").getBoundingClientRect();
                    this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");

                    this.log(`⚔️ ${this.p2.name} utilise ${move.label} ! Dégâts: ${dmg}`, "#e63946");
                    let quote = this.randElement(move.quotes);
                    //console.log(opponentDoctrineName, quote);
                    this.verbatim(`${opponentDoctrineName} : ${quote}`);
                    animateAttack("p2", "p1");
                    this.publicFavUpdate(incA, incB, dmg, (res = 0));
                    this.updatePublicFavUI();
                    //this.updatePublicFavThresholds();
                    this.checkPublicVictory();
                    this.isCounter = false;
                } else {
                    this.log("⚡ Vous parez l'attaque ! Parade possible au prochain tour !", "cyan");
                    this.isCounter = true;
                    document.getElementById("counter-badge").style.display = "block";
                }
            }

            // Mise à jour des états après le tour
            if (this.p2.aporie > 0) this.p2.aporie--;
            this.p2.focus = Math.max(0, this.p2.focus - 5);

            this.showTurnIndicator("p1");
            //this.turnCount++;
            document.getElementById("turn-counter").textContent = `Tour: ${this.turnCount}`;
            this.updateUI();
            this.renderActions();
            this.checkWin();
            //console.log("Juste avant la fin du tour ennemi.", this.isEnemyTurn);

            //console.log("Juste après la fin du tour ennemi.", this.isEnemyTurn);

            if (!this.gameOver) {
                this.showTurnIndicator("p1"); // Retour au tour du joueur
            }
            this.isEnemyTurn = false;
        }, 1200);
    }

    endTurn() {
        if (this.p1.aporie > 0) this.p1.aporie--;
        this.updateUI();
        this.checkWin();
        if (!this.gameOver) {
            this.turnCount++;
            this.updatePublicFavUI();
            this.checkPublicVictory();
            this.opponentTurn();
        }
    }

    /**
     * Affiche les seuils de victoire actuels
     */

    updatePublicFavUI() {
        // Calcul des seuils dynamiques
        const victoryThreshold = Math.max(20, 100 - this.turnCount);
        const defeatThreshold = Math.min(80, this.turnCount);

        // Mise à jour des variables CSS
        document.documentElement.style.setProperty("--victory-threshold", `${victoryThreshold}%`);
        document.documentElement.style.setProperty("--defeat-threshold", `${defeatThreshold}%`);
        document.documentElement.style.setProperty("--current-fav", `${this.publicFav}%`);

        // Mise à jour des marqueurs dans le bon conteneur
        const gaugeContainer = document.getElementById("public-fav-container");
        if (gaugeContainer) {
            // Supprime tous les anciens marqueurs
            const oldMarkers = gaugeContainer.querySelectorAll(".public-threshold-marker");
            oldMarkers.forEach((marker) => marker.remove());

            // Ajoute les nouveaux marqueurs
            const victoryMarker = document.createElement("div");
            victoryMarker.className = "public-threshold-marker victory";
            victoryMarker.style.left = `${victoryThreshold}%`;
            gaugeContainer.appendChild(victoryMarker);

            const defeatMarker = document.createElement("div");
            defeatMarker.className = "public-threshold-marker defeat";
            defeatMarker.style.right = `${defeatThreshold}%`;
            gaugeContainer.appendChild(defeatMarker);
        }

        // Mise à jour de l'affichage des seuils
        this.displayThresholds(victoryThreshold, defeatThreshold);
    }

    displayThresholds(victoryThreshold, defeatThreshold) {
        const thresholdsElement = document.getElementById("public-thresholds");
        if (thresholdsElement) {
            thresholdsElement.innerHTML = `
            <div class="threshold-info">
                <span class="victory">🏆 Victoire: ${victoryThreshold}%</span>
                <span class="defeat">⚠️ Défaite: ${defeatThreshold}%</span>
                <span class="current">👥 Actuel: ${Math.round(this.publicFav)}%</span>
            </div>
        `;
        }
    }

    updateUI() {
        this.p1.health = Math.max(0, Math.min(100000, this.p1.health));
        this.p2.health = Math.max(0, Math.min(100000, this.p2.health));
        this.p1.focus = Math.max(0, Math.min(100000, this.p1.focus));
        this.p2.focus = Math.max(0, Math.min(100000, this.p2.focus));

        document.getElementById("p1-health").style.width = this.p1.health + "%";
        document.getElementById("p1-focus").style.width = this.p1.focus + "%";
        document.getElementById("p2-health").style.width = this.p2.health + "%";
        document.getElementById("p2-focus").style.width = this.p2.focus + "%";
        //document.getElementById("gauge-container").style.width = 100 + "%";
        document.getElementById("public-fav-fill").style.width = this.publicFav + "%";
        //document.getElementById("gauge-container").style.width = 100 + "%";

        document.getElementById("p1-health-val").textContent = Math.round(this.p1.health);
        document.getElementById("p1-focus-val").textContent = Math.round(this.p1.focus);
        document.getElementById("p2-health-val").textContent = Math.round(this.p2.health);
        document.getElementById("p2-focus-val").textContent = Math.round(this.p2.focus);
        document.getElementById("public-percent").textContent = Math.round(this.publicFav) + "%";

        document.getElementById("p1-aporie").innerHTML =
            this.p1.aporie > 0 ? `<span class="aporie-badge">APORIE (${this.p1.aporie})</span>` : "";
        document.getElementById("p2-aporie").innerHTML =
            this.p2.aporie > 0 ? `<span class="aporie-badge">APORIE (${this.p2.aporie})</span>` : "";

        let label,
            labelColor = "#a29bfe";
        if (this.publicFav > 75) {
            label = "✨ L'AUDITOIRE VOUS ACCLAME ! (Boost Lvl 2)";
            labelColor = "#2a9d8f";
        } else if (this.publicFav > 65) {
            label = "👏 L'AUDITOIRE VOUS SOUTIENT (Boost Lvl 2)";
            labelColor = "#457b9d";
        } else if (this.publicFav < 25) {
            label = "😠 L'AUDITOIRE VOUS REJETTE...";
            labelColor = "#e63946";
        } else if (this.publicFav < 35) {
            label = "😕 L'AUDITOIRE DOUTE DE VOS ARGUMENTS";
            labelColor = "#ff7675";
        } else {
            label = "😐 L'AUDITOIRE EST NEUTRE";
        }

        const publicLabel = document.getElementById("public-label");
        publicLabel.textContent = label;
        publicLabel.style.color = labelColor;

        const comboText = ["Niveau 1 : Fondements", "Niveau 2 : Approfondissement", "Niveau 3 : Transcendance"];
        document.getElementById("combo-status").textContent = comboText[this.currentLevel - 1];

        if (this.playerDoctrine === "buddhist") {
            const satoriValue = Math.min(100, this.argumentsSuccessful * 5);
            document.getElementById("p1-satori").style.width = satoriValue + "%";
            document.getElementById("p1-satori-val").textContent = satoriValue;
        }

        if (this.opponentDoctrine === "buddhist") {
            const opponentSatoriValue = Math.min(100, (this.turnCount - this.argumentsSuccessful) * 3);
            document.getElementById("p2-satori").style.width = opponentSatoriValue + "%";
            document.getElementById("p2-satori-val").textContent = opponentSatoriValue;
        }

        // Effets visuels spécifiques aux Cyniques
        if (this.playerDoctrine === "cynic") {
            document.getElementById("p1-card").style.borderColor = "#d4a574";
        }
        if (this.opponentDoctrine === "cynic") {
            document.getElementById("p2-card").style.borderColor = "#d4a574";
        }
        if (this.playerDoctrine === "cynic") {
            const provocationValue = Math.min(100, this.argumentsSuccessful * 7);
            document.getElementById("p1-provocation").style.width = provocationValue + "%";
            document.getElementById("p1-provocation-val").textContent = provocationValue;
        }
    }

    /**
     * Vérifie si un joueur remporte la victoire par la faveur publique
     * @returns {boolean} True si victoire, false sinon
     */
    checkPublicVictory() {
        const playerThreshold = 100 - this.turnCount; // Seuil décroissant pour le joueur
        const opponentThreshold = this.turnCount; // Seuil croissant pour l'adversaire

        if (this.publicFav >= playerThreshold) {
            this.endGame(`${this.p1.name} remporte le débat par la faveur publique !`, "public");
            return true;
        } else if (this.publicFav <= opponentThreshold) {
            this.endGame(`${this.p2.name} remporte le débat par la faveur publique !`, "public");
            return true;
        }
        return false;
    }

    checkWin() {
        const victory = this.p1.health > 0;
        if (this.p1.health <= 0 || this.p2.health <= 0) {
            this.gameOver = true;

            const screen = document.getElementById("victory-screen");
            const title = document.getElementById("victory-title");
            const stats = document.getElementById("victory-stats");
            let msg = "";
            if (victory) {
                msg = this.randElement(this.p1.doctrine.victoryMessages);
                title.textContent = msg;
                title.style.color = "#FFD700";
            } else {
                msg = this.randElement(this.p1.doctrine.defeatMessages);
                title.textContent = msg;
                title.style.color = "#FF0000";
            }

            stats.innerHTML = `
            <div><strong>Tours écoulés:</strong> ${this.turnCount}</div>
            <div><strong>Arguments réussis:</strong> ${this.argumentsSuccessful}</div>
            <div><strong>Dégâts totaux infligés:</strong> ${this.damageDealt}</div>
            <div><strong>Faveur finale de l'auditoire:</strong> ${Math.round(this.publicFav)}%</div>
            <div><strong>Votre vitalité restante:</strong> ${Math.round(this.p1.health)}</div>
        `;

            screen.style.display = "flex";
            this.log(victory ? "🎉 VICTOIRE PHILOSOPHIQUE !" : "💔 Défaite...", victory ? "#ffb703" : "#e63946");
        }
    }

    endGame() {
        const victory = this.checkWin();
        this.gameOver = true;

        const screen = document.getElementById("victory-screen");
        const title = document.getElementById("victory-title");
        const stats = document.getElementById("victory-stats");
        let msg = "";
        if (victory) {
            msg = this.randElement(this.p1.doctrine.victoryMessages);
            title.textContent = msg;
            title.style.color = "#FFD700";
        } else {
            msg = this.randElement(this.p1.doctrine.defeatMessages);
            title.textContent = msg;
            title.style.color = "#FF0000";
        }

        stats.innerHTML = `
            <div><strong>Tours écoulés:</strong> ${this.turnCount}</div>
            <div><strong>Arguments réussis:</strong> ${this.argumentsSuccessful}</div>
            <div><strong>Dégâts totaux infligés:</strong> ${this.damageDealt}</div>
            <div><strong>Faveur finale de l'auditoire:</strong> ${Math.round(this.publicFav)}%</div>
            <div><strong>Votre vitalité restante:</strong> ${Math.round(this.p1.health)}</div>
        `;

        screen.style.display = "flex";
        this.log(victory ? "🎉 VICTOIRE PHILOSOPHIQUE !" : "💔 Défaite...", victory ? "#ffb703" : "#e63946");
    }

    addSpecialAbilityButtons(panel) {
        const specialAbilities = {
            stoic: {
                label: "Réminiscence Platonicienne",
                icon: "📜",
                description: "Restaure toute la Concentration",
                action: () => {
                    this.p1.focus = 100;
                    this.reminiscenceUsed = true;
                    this.log("💫 Réminiscence activée ! Concentration restaurée !", "cyan");
                    this.updateUI();
                    this.renderActions();
                },
                disabled: () => this.reminiscenceUsed || this.gameOver
            },
            epicurean: {
                label: "Banquet Philosophique",
                icon: "🍷",
                description: "Restaure Vitalité et Concentration",
                action: () => {
                    this.p1.health = Math.min(100, this.p1.health + 20);
                    this.p1.focus = Math.min(100, this.p1.focus + 20);
                    this.log("🍷 Banquet Philosophique : Vitalité et Concentration restaurées !", "#457b9d");
                    this.updateUI();
                    this.renderActions();
                },
                disabled: () => this.gameOver
            },
            buddhist: {
                label: "Méditation Profonde",
                icon: "🧘",
                description: "Restaure Concentration et réduit l'Aporie",
                action: () => {
                    this.p1.focus = 100;
                    this.p1.aporie = Math.max(0, this.p1.aporie - 1);
                    this.log("🧘 Méditation Profonde : Concentration restaurée et Aporie réduite !", "#ffb703");
                    this.updateUI();
                    this.renderActions();
                },
                disabled: () => this.gameOver
            },
            cynic: [
                {
                    label: "Mendicité Cynique",
                    icon: "🐕",
                    description: "Restaure Vitalité et Concentration",
                    action: () => {
                        this.p1.health = Math.min(100, this.p1.health + 20);
                        this.p1.focus = Math.min(100, this.p1.focus + 20);
                        this.log("🐕 Mendicité Cynique : Vitalité et Concentration restaurées !", "#d4a574");
                        this.updateUI();
                        this.renderActions();
                    },
                    disabled: () => this.gameOver
                },
                {
                    label: "Défi Public",
                    icon: "🏛️",
                    description: "Augmente la Provocation et réduit la faveur adverse",
                    action: () => {
                        this.p1.focus = Math.min(100, this.p1.focus + 15);
                        this.publicFav = Math.min(100, this.publicFav + 10);
                        this.log(
                            "🏛️ Défi Public : Votre provocation augmente votre concentration et gagne la faveur de l'auditoire !",
                            "#d4a574"
                        );
                        this.updateUI();
                        this.renderActions();
                    },
                    disabled: () => this.gameOver
                }
            ]
        };

        const doctrineKey = this.playerDoctrineKey;
        if (specialAbilities[doctrineKey]) {
            const abilities = Array.isArray(specialAbilities[doctrineKey])
                ? specialAbilities[doctrineKey]
                : [specialAbilities[doctrineKey]];

            abilities.forEach((ability) => {
                const btn = document.createElement("button");
                btn.className = "special";
                btn.innerHTML = `
                <div>${ability.icon} ${ability.label}</div>
                <div style="font-size: 0.8em;">${ability.description}</div>
            `;
                btn.disabled = ability.disabled();
                btn.onclick = ability.action;
                panel.appendChild(btn);
            });
        }
    }
}
