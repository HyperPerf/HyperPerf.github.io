export class Philosopher {
    constructor(name, doctrine) {
        this.health = 100000;
        this.focus = 100000;
        this.aporie = 0;
        this.shield = 0;
        this.name = name;
        this.doctrine = doctrine;
        this.precisionPenalty = false;
        this.initMoves();
    }
    
     /**
     * Initialise les propriétés par défaut des moves
     */
    initMoves() {
        if (!this.doctrine || !this.doctrine.moves) return;

        this.doctrine.moves.forEach(move => {
            // Propriétés par défaut pour tous les moves
            const defaultProps = {
                passed: false,
                synth: false,
                weight: move.weight || 0,
                icon: move.icon || "📄",
                level: move.level || 1,
                baseDmg: move.baseDmg || move.dmg || 0,
                precision: move.precision || move.prec || 0.8,
                focus: move.focus || 0,
                quotes: move.quotes || [move.quote || "Citation par défaut"],
                gameplay: move.gameplay || "Description par défaut",
                inclination: move.inclination || {},
                required: move.required || [],
                effect: move.effect || (() => {})
            };

            // Applique les propriétés par défaut uniquement si elles n'existent pas
            Object.keys(defaultProps).forEach(key => {
                if (move[key] === undefined) {
                    move[key] = defaultProps[key];
                }
            });

            // Initialisation spécifique pour les nouveaux moves
            if (move.level > 1 && move.synth === undefined) {
                move.synth = false;
            }
        });
    }
}
