export class Philosopher {
    constructor(name, doctrine) {
        this.health = 100;
        this.focus = 100;
        this.aporie = 0;
        this.shield = 0;
        this.name = name;
        this.doctrine = doctrine;
        this.precisionPenalty = false;
    }
}
