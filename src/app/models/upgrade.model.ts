import { Generator } from './generator.model';
import { Dependency, Purchasable } from './resource.interface';

export function isUpgrade(g: Generator | Upgrade | Purchasable | Dependency): g is Upgrade {
    return (<Upgrade>g).type === 'upgrade';
}

export type UpgradeType = Upgrade | BasicUpgrade | BoostUpgrade | SynergyUpgrade;

/**
 * Upgrades are attached to a specific generator, and simply multiply the
 * generators production by their bonus function. Bonus functions can associate
 * any two generators.
 */
export class Upgrade implements Dependency, Purchasable {
    static list: Map<string, UpgradeType> = new Map;
    static synergies = [];
    public type: 'upgrade';
    public available = false;
    public bought = false;
    constructor(
        public name: string = 'Unnamed Upgrade',
        protected target: Generator,
        protected bonusFn: () => number = () => 1,
        protected price: number,
        protected deps: Dependency[],
        protected source: Generator = target) {
        target.upgrades.push(this);
        // console.log(Upgrade.list);
        Upgrade.list.set(this.name, this);
    }
    static processSynergies() {
        Upgrade.synergies.map(this.fromJSON);
    }
    static fromJSON(json) {
        if (Upgrade.list.has(json.name)) {
            return Upgrade.list.get(json.name);
        }
        let upgrade: UpgradeType;
        const target: Generator = Generator.list.get(json.target);
        const source: Generator = Generator.list.get(json.source);
        const deps: Generator[] = json.deps.map((name) => {
            let gen: Dependency = Generator.list.get(name);
            if (gen === undefined) {
                gen = Upgrade.list.get(name);
            }
            return gen;
        });
        switch (json.type) {
            case 'multiplier':
                upgrade = new BasicUpgrade(target, json.mult, json.price, deps);
                break;
            case 'boost':
                upgrade = new BoostUpgrade(target, json.mult, json.num, json.price, deps);
                break;
            case 'synergy':
                if (!source) {
                    Upgrade.synergies.push(json);
                    return null;
                } else {
                    upgrade = new SynergyUpgrade(target, json.price, deps, source);
                }
                break;
        }
        upgrade.bought = json.bought;
        return upgrade;
    }
    toJSON() {
        return {
            type: this.type,
            available: this.available,
            bought: this.bought,
            name: this.name,
            target: this.target.name,
            price: this.price,
            deps: this.deps.map(dep => dep.name),
            source: this.source.name
        };
    }
    purchase(): number {
        if (this.checkAvailable()) {
            this.bought = true;
            return this.getCost();
        } else {
            return 0;
        }
    }
    getValue(rate: number): number { // NB: This could possible introduce negatives.
        return this.getCost() * (1 / (this.target.getTotalRate() * (this.bonusFn() - 1)) + 1 / rate);
    }
    isFulfilled(): boolean {
        return this.bought;
    }

    checkAvailable(): boolean {
        if (this.bought) {
            this.available = false;
        } else {
            this.available = this.deps.every((dep: Dependency) => dep.isFulfilled());
        }
        return this.available;
    }

    getCost(): number {
        if (!this.bought) {
            return this.price;
        } else {
            return 0;
        }
    }

    /**
     * Calculates the upgrade's multiplier and returns it.
     * @returns {number} Upgrade Bonus Multiplier
     */
    bonus(): number {
        if (this.bought) {
            return this.bonusFn();
        } else {
            return 1;
        }
    }
}

/**
 * Basic Upgrade is the simple multiplier upgrade.
 */
export class BasicUpgrade extends Upgrade {
    public upgradeType: 'multiplier';
    constructor(protected target: Generator,
        private mult: number,
        protected price: number,
        protected deps: Dependency[]) {
        super(`${target.name}: x${mult} Multiplier`, target, () => mult, price, deps);
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: 'multiplier',
            target: this.target.name,
            mult: this.mult,
            price: this.price,
            deps: this.deps.map(gen => gen.name)
        });
    }
}

/**
 * Boost Upgrade multiplier is 1+mult*current/num, for instance, +10% for every 10 generators.
 */
export class BoostUpgrade extends Upgrade {
    public upgradeType: 'boost';
    constructor(protected target: Generator,
        private mult: number,
        private num: number,
        protected price: number,
        protected deps: Dependency[]
    ) {
        super(`${target.name}: ${mult}/${num} Boost`, target, () => 1 + Math.floor(target.num / num) * mult, price, deps);
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: 'boost',
            target: this.target.name,
            mult: this.mult,
            num: this.num,
            price: this.price,
            deps: this.deps.map(gen => gen.name)
        });
    }
}

/**
 * Synergy Upgrade multiplier is 1+source number/100. For instance, boosting II by 1% of IV.
 */
export class SynergyUpgrade extends Upgrade {
    public upgradeType: 'synergy';
    constructor(protected target: Generator,
        protected price: number,
        protected deps: Dependency[],
        protected source: Generator
    ) {
        super(`${target.name}: ${source.name} Synergy`, target, () => 1 + (source.num / 100), price, deps, source);
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: 'synergy',
            target: this.target.name,
            source: this.source.name,
            price: this.price,
            deps: this.deps.map(gen => gen.name)
        });
    }
}
