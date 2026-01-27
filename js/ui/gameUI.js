import { DOCTRINES } from '../doctrines.js';
import { createElement } from "../utils.js";
import { updateFighterCard } from "./fighterUI.js";

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

export function renderActionPanel(game, onMoveSelected) {
    console.log(game);
    const panel = document.getElementById("action-panel");
    panel.innerHTML = "";

    // Sélection des mouvements en fonction de la doctrine du joueur
    const doctrine = game.playerDoctrine;
    const doctrineName = game.playerDoctrine.id;

    const moves = doctrine.moves;
    console.log(moves);

    // Niveau de base effectif en fonction de la faveur de l'auditoire
    const effectiveBase = game.publicFav > 65 ? 2 : 1;

    // Création des boutons pour chaque mouvement
    moves.forEach((move) => {
        const btn = createElement(
            "button",
            "",
            `
            <div>L${move.level} - ${move.label}</div>
            <div style="font-size: 0.8em; opacity: 0.7;">
                💥 ${move.baseDmg || move.dmg || 0} |
                🎯 ${Math.round((move.precision || move.prec || 0) * 100)}% |
                🧠 ${move.focus || 0}
            </div>
        `
        );

        // Vérification de la disponibilité du mouvement
        const canUse =
            (move.level <= effectiveBase ||
                move.level <= game.currentLevel ||
                (game.isCounter && move.level === game.currentLevel + 1)) &&
            game.p1.focus >= move.focus;

        // Classe CSS en fonction du niveau du mouvement
        let levelClass = "";
        if (move.level === 2) levelClass = "level-2";
        if (move.level === 3) levelClass = "level-3";

        // État du bouton
        btn.disabled = !canUse || game.gameOver;
        btn.className = canUse ? `unlocked ${levelClass}` : "";

        // Action au clic
        btn.onclick = () => onMoveSelected(move);
        panel.appendChild(btn);
    });

    // Bouton spécial pour le stoïcisme : Réminiscence Platonicienne
    if (doctrineName === "stoic") {
        const remBtn = document.createElement("button");
        remBtn.className = "special";
        remBtn.innerHTML = `
            <div>📜 Réminiscence Platonicienne</div>
            <div style="font-size: 0.8em;">Restaure toute la Concentration</div>
        `;
        remBtn.disabled = this.reminiscenceUsed || this.gameOver;
        remBtn.onclick = () => {
            this.p1.focus = 100;
            this.reminiscenceUsed = true;
            const doctrine = DOCTRINES[this.playerDoctrine];
            this.log("💫 Réminiscence activée ! Concentration restaurée !", "cyan");
            this.updateUI();
            this.renderActions();
        };
        panel.appendChild(remBtn);
    }

    // Bouton spécial pour l'épicurisme : Banquet Philosophique
    if (doctrineName === "epicurean") {
        const banquetBtn = document.createElement("button");
        banquetBtn.className = "special";
        banquetBtn.innerHTML = `
            <div>🍷 Banquet Philosophique</div>
            <div style="font-size: 0.8em;">Restaure Vitalité et Concentration</div>
        `;
        banquetBtn.disabled = this.gameOver;
        banquetBtn.onclick = () => {
            this.p1.health = Math.min(100, this.p1.health + 20);
            this.p1.focus = Math.min(100, this.p1.focus + 20);
            this.log("🍷 Banquet Philosophique : Vitalité et Concentration restaurées !", "#457b9d");
            this.updateUI();
            this.renderActions();
        };
        panel.appendChild(banquetBtn);
    }

    // Bouton spécial pour le bouddhisme : Méditation Profonde
    if (doctrineName === "buddhist") {
        const meditationBtn = document.createElement("button");
        meditationBtn.className = "special";
        meditationBtn.innerHTML = `
            <div>🧘 Méditation Profonde</div>
            <div style="font-size: 0.8em;">Restaure Concentration et réduit l'Aporie</div>
        `;
        meditationBtn.disabled = this.gameOver;
        meditationBtn.onclick = () => {
            this.p1.focus = 100;
            this.p1.aporie = Math.max(0, this.p1.aporie - 1);
            this.log("🧘 Méditation Profonde : Concentration restaurée et Aporie réduite !", "#ffb703");
            this.updateUI();
            this.renderActions();
        };
        panel.appendChild(meditationBtn);
    }
    if (doctrineName === "cynic") {
        const cynicBtn = document.createElement("button");
        cynicBtn.className = "special";
        cynicBtn.innerHTML = `
        <div>🐕 Mendicité Cynique</div>
        <div style="font-size: 0.8em;">Restaure Vitalité et Concentration</div>
    `;
        cynicBtn.disabled = this.gameOver;
        cynicBtn.onclick = () => {
            this.p1.health = Math.min(100, this.p1.health + 20);
            this.p1.focus = Math.min(100, this.p1.focus + 20);
            this.log("🐕 Mendicité Cynique : Vitalité et Concentration restaurées !", "#d4a574");
            this.updateUI();
            this.renderActions();
        };
        panel.appendChild(cynicBtn);
    }
    // Bouton spécial pour les Cyniques : "Défi Public"
    if (doctrineName === "cynic") {
        const defiBtn = document.createElement("button");
        defiBtn.className = "special";
        defiBtn.innerHTML = `
            <div>🏛️ Défi Public</div>
            <div style="font-size: 0.8em;">Augmente la Provocation et réduit la faveur adverse</div>
        `;
        defiBtn.disabled = this.gameOver;
        defiBtn.onclick = () => {
            this.p1.focus = Math.min(100, this.p1.focus + 15);
            this.publicFav = Math.min(100, this.publicFav + 10);
            this.log(
                "🏛️ Défi Public : Votre provocation augmente votre concentration et gagne la faveur de l'auditoire !",
                "#d4a574"
            );
            this.updateUI();
            this.renderActions();
        };
        panel.appendChild(defiBtn);
    }
}
