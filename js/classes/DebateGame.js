import { DOCTRINES } from "../doctrines.js";
import { Philosopher } from "./Philosopher.js";

export class DebateGame {
    constructor(playerDoctrineKey, opponentDoctrineKey) {
        // Utilise les clés pour accéder aux doctrines
        this.playerDoctrine = DOCTRINES[playerDoctrineKey];
        this.opponentDoctrine = DOCTRINES[opponentDoctrineKey];

        // Stocke les clés des doctrines pour les comparaisons futures
        this.playerDoctrineKey = playerDoctrineKey;
        this.opponentDoctrineKey = opponentDoctrineKey;

        // Initialisation des combattants
        this.p1 = new Philosopher("Joueur", this.playerDoctrine);
        this.p2 = new Philosopher("Adversaire", this.opponentDoctrine);

        // Initialisation des propriétés du jeu
        this.publicFav = 50;
        this.currentLevel = 1;
        this.isCounter = false;
        this.gameOver = false;
        this.reminiscenceUsed = false;
        this.turnCount = 1;
        this.damageDealt = 0;
        this.argumentsSuccessful = 0;

        // Mise à jour de l'UI
        this.updateUI();
        this.renderActions();
        this.showTurnIndicator("p1");
    }

    randElement(array) {
        //console.log("randElement : ", array);
        //console.log("randElement.length : ", array.length);
        let i = Math.round(Math.random() * (array.length - 1));
        console.log(i, array[i]);
        return array[i];
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

    verbatim(q) {
        const v = document.getElementById("verbatim");
        const entry = document.createElement("div");
        entry.className = "verbatim-entry";
        entry.textContent = q;
        v.insertBefore(entry, v.firstChild);
    }

    updateComboDots() {
        for (let i = 1; i <= 3; i++) {
            const dot = document.getElementById(`dot${i}`);
            dot.classList.toggle("active", i <= this.currentLevel);
        }
    }

    renderActions() {
        const panel = document.getElementById("action-panel");
        panel.innerHTML = "";

        const moves = this.playerDoctrine.moves;
        const effectiveBase = this.publicFav > 65 ? 2 : 1;

        moves.forEach((move) => {
            const btn = document.createElement("button");
            const canUse =
                (move.level <= effectiveBase ||
                    move.level <= this.currentLevel ||
                    (this.isCounter && move.level === this.currentLevel + 1)) &&
                this.p1.focus >= move.focus;

            let levelClass = "";
            if (move.level === 2) levelClass = "level-2";
            if (move.level === 3) levelClass = "level-3";

            btn.innerHTML = `
            <div>L${move.level} - ${move.label}</div>
            <div style="font-size: 0.8em; opacity: 0.7;">
                💥 ${move.baseDmg || move.dmg || 0} |
                🎯 ${Math.round((move.precision || move.prec || 0) * 100)}% |
                🧠 ${move.focus || 0}
            </div>
        `;

            btn.disabled = !canUse || this.gameOver;
            btn.className = canUse ? `unlocked ${levelClass}` : "";
            btn.onclick = () => this.handleMove(move);
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
        console.log("Joueur quote : ", quote);

        this.verbatim(`${doctrineInfo?.verbatimPrefix || ""}${quote}`);
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

    logOpponentMove(name, move, dmg, doctrine) {
        const doctrineInfo = DOCTRINES[doctrine];
        if (doctrineInfo && doctrineInfo.opponentLogMessage) {
            this.log(doctrineInfo.opponentLogMessage(name, move, dmg), "#e63946");
        } else {
            this.log(`⚔️ ${name} utilise ${move.label} ! Dégâts: ${dmg}`, "#e63946");
        }
        let quote = this.randElement(move.quotes);
        console.log("Ennemi quote : ", quote);
        this.verbatim(`${doctrineInfo?.verbatimPrefix || ""}${quote}`);
    }

    handleMove(move) {
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

        if (this.isCounter) {
            chance = Math.min(0.98, chance + 0.15);
            this.log("⚡ Parade activée ! Précision augmentée !", "cyan");
            document.getElementById("counter-badge").style.display = "none";
        }

        if (Math.random() < chance) {
            let dmg = move.baseDmg || move.dmg || 0;
            let heal = move.heal || 0;
            let shield = move.shield || 0;

            if (this.p2.shield > 0 && dmg > 0) {
                const blocked = Math.min(this.p2.shield, dmg);
                dmg -= blocked;
                this.p2.shield -= blocked;
                this.log(`🛡️ Bouclier absorbe ${blocked} dégâts !`, "#457b9d");
            }

            if (dmg > 0) {
                this.p2.health -= dmg;
                this.damageDealt += dmg;
                this.argumentsSuccessful++;
                this.publicFav = Math.min(100, this.publicFav + 8);

                const cardRect = document.getElementById("p2-card").getBoundingClientRect();
                this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");

                this.logMoveSuccess(move, dmg, this.playerDoctrineKey);
            }

            if (heal > 0) {
                this.p1.health = Math.min(100, this.p1.health + heal);
                this.logHeal(move, heal, this.playerDoctrineKey);
            }

            if (shield > 0) {
                this.p1.shield = shield;
                this.log(`🛡️ ${move.label} : Bouclier activé (${shield}).`, this.playerDoctrine.color);
                let quote = this.randElement(move.quotes);
                this.verbatim(`${this.playerDoctrine.verbatimPrefix}${quote}`);
            }

            if (move.level === 3 && Math.random() < 0.6) {
                this.p2.aporie = 2;
                this.log("🌀 Votre adversaire est plongé dans une Aporie philosophique !", "#a29bfe");
            }

            this.currentLevel = Math.min(3, move.level + 1);
            this.isCounter = false;
        } else {
            this.log("✗ Argument réfuté par l'adversaire. Retour aux fondamentaux.", "#888");
            this.currentLevel = 1;
            this.publicFav = Math.max(0, this.publicFav - 5);
            this.isCounter = false;
        }

        this.updateComboDots();
        this.endTurn();
    }

    opponentTurn() {
        this.showTurnIndicator("p2");
        setTimeout(() => {
            if (this.gameOver) return;

            // Gestion de l'Aporie adverse
            if (this.p2.aporie > 0 && Math.random() < 0.35) {
                this.log("🌀 L'adversaire est paralysé par l'Aporie !", "#ff7675");
                this.p2.aporie--;
                this.showTurnIndicator("p1");
                this.turnCount++;
                document.getElementById("turn-counter").textContent = `Tour: ${this.turnCount}`;
                this.renderActions();
                return;
            }

            // Sélection des mouvements en fonction de la doctrine adverse
            const opponentDoctrine = this.opponentDoctrine;
            const moves = opponentDoctrine.moves;

            // Logique de sélection du mouvement
            let move = moves[0]; // Par défaut, sélectionne le premier mouvement

            if (this.opponentDoctrineKey === "stoic") {
                if (this.p2.health < 35)
                    move = moves[3]; // Citadelle Intérieure
                else if (this.p2.health < 60 && Math.random() < 0.4)
                    move = moves[1]; // Suivre la Nature
                else if (Math.random() < 0.6)
                    move = moves[0]; // Dichotomie du Contrôle
                else move = moves[2]; // Souffle Vital
            } else if (this.opponentDoctrineKey === "epicurean") {
                if (this.p2.health < 35)
                    move = moves[2]; // Retraite au Jardin
                else if (this.p2.health < 60 && Math.random() < 0.4)
                    move = moves[3]; // Ataraxie
                else if (Math.random() < 0.6)
                    move = moves[0]; // Clinamen
                else move = moves[1]; // Tétrapharmakon
            } else if (this.opponentDoctrineKey === "buddhist") {
                if (this.p2.health < 30)
                    move = moves[3]; // Sati
                else if (this.p2.health < 50 && Math.random() < 0.5)
                    move = moves[5]; // Karuna
                else if (Math.random() < 0.7)
                    move = moves[0]; // Dukkha
                else move = moves[1]; // Tanha
            } else if (this.opponentDoctrineKey === "cynic") {
                if (this.p2.health < 35)
                    move = moves[3]; // Provocation
                else if (this.p2.health < 60 && Math.random() < 0.4)
                    move = moves[2]; // Vie Naturelle
                else if (Math.random() < 0.6)
                    move = moves[0]; // Lanterne de Diogène
                else move = moves[1]; // Mépris des Conventions
            }

            // Vérifie que move n'est pas null
            if (!move) {
                move = moves[0]; // Par défaut, utilise le premier mouvement si aucun n'est sélectionné
            }

            const opponentDoctrineName = opponentDoctrine.verbatimPrefix.trim();

            // Gestion des effets de l'adversaire
            if (move.heal) {
                this.p2.health = Math.min(100, this.p2.health + move.heal);
                this.log(`💖 ${this.p2.name} utilise ${move.label} et se soigne de ${move.heal} points.`, "#2a9d8f");
                let quote = this.randElement(move.quotes);
                this.verbatim(`${opponentDoctrineName} : ${quote}`);
            } else if (move.shield) {
                const success = Math.random() < (move.precision || move.prec);
                if (success) {
                    const dmg = move.baseDmg || move.dmg || 0;
                    this.p1.health -= dmg;
                    this.p2.shield = move.shield;
                    this.publicFav = Math.max(0, this.publicFav - 10);

                    const cardRect = document.getElementById("p1-card").getBoundingClientRect();
                    this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");

                    this.log(
                        `🛡️ ${this.p2.name} utilise ${move.label} ! Dégâts: ${dmg} | Bouclier: ${move.shield}`,
                        "#e63946"
                    );
                    let quote = this.randElement(move.quotes);
                    this.verbatim(`${opponentDoctrineName} : ${quote}`);
                    this.isCounter = false;
                } else {
                    this.log("⚡ Vous parez l'attaque ! Parade possible au prochain tour !", "cyan");
                    this.isCounter = true;
                    document.getElementById("counter-badge").style.display = "block";
                }
            } else {
                const success = Math.random() < (move.precision || move.prec);
                if (success) {
                    const dmg = move.baseDmg || move.dmg || 0;
                    this.p1.health -= dmg;
                    this.publicFav = Math.max(0, this.publicFav - 10);

                    const cardRect = document.getElementById("p1-card").getBoundingClientRect();
                    this.showDamagePopup(dmg, cardRect.left + cardRect.width / 2, cardRect.top + 50, "#e63946");

                    this.log(`⚔️ ${this.p2.name} utilise ${move.label} ! Dégâts: ${dmg}`, "#e63946");
                    let quote = this.randElement(move.quotes);
                    this.verbatim(`${opponentDoctrineName} : ${quote}`);
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
            this.turnCount++;
            document.getElementById("turn-counter").textContent = `Tour: ${this.turnCount}`;
            this.updateUI();
            this.renderActions();
            this.checkWin();

            if (!this.gameOver) {
                this.showTurnIndicator("p1"); // Retour au tour du joueur
            }
        }, 1200);
    }

    endTurn() {
        if (this.p1.aporie > 0) this.p1.aporie--;
        this.updateUI();
        this.checkWin();
        if (!this.gameOver) this.opponentTurn();
    }

    updateUI() {
        this.p1.health = Math.max(0, Math.min(100, this.p1.health));
        this.p2.health = Math.max(0, Math.min(100, this.p2.health));
        this.p1.focus = Math.max(0, Math.min(100, this.p1.focus));
        this.p2.focus = Math.max(0, Math.min(100, this.p2.focus));

        document.getElementById("p1-health").style.width = this.p1.health + "%";
        document.getElementById("p1-focus").style.width = this.p1.focus + "%";
        document.getElementById("p2-health").style.width = this.p2.health + "%";
        document.getElementById("p2-focus").style.width = this.p2.focus + "%";
        document.getElementById("public-fav").style.width = this.publicFav + "%";

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
