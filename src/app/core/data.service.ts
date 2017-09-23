import { ParticleGenerator } from '../models/particle-generator.model';
import { BasicUpgrade, BoostUpgrade, SynergyUpgrade, Upgrade, UpgradeType } from '../models/upgrade.model';
import { Injectable } from '@angular/core';

const storageKey = 'nucleo-fusion';

@Injectable()
export class DataService {
  public generators: ParticleGenerator[];
  public upgrades: UpgradeType[];
  public current: number;
  public total: number;
  public rate: number;
  private data;
  public efficient: ParticleGenerator = null;
  public slush = [];

  constructor() {
    this.data = localStorage.getItem(storageKey);
    this.initialize(JSON.parse(this.data));
    this.getTotalRate();
  }

  initialize(data) {
    // TODO: Rewrite to run buildGenerators every load and overwrite data from save
    this.generators = [];
    this.upgrades = [];
    ParticleGenerator.list.clear();
    Upgrade.list.clear();
    this.current = 15;
    this.total = this.current;
    this.rate = 0;
    this.efficient = null;
    if (data) {
      if (data.generators) {
        data.generators.forEach((gen) => this.generators.push(ParticleGenerator.fromJSON(gen)));
      }
      if (Upgrade.synergies) {
        Upgrade.processSynergies();
      }
      this.current = data.current || 15;
      this.total = data.total || this.current;
    }
    if (this.generators.length === 0) {
      this.buildGenerators();
    }
    // this.buildGenerators();
    this.save();
    this.generators = [...Array.from(ParticleGenerator.list.values())];
    this.upgrades = [...Array.from(Upgrade.list.values())];
    this.upgrades.sort((a, b) => b.getCost() - a.getCost());
    this.slush = [...Array.from(ParticleGenerator.list.values()), ...Array.from(Upgrade.list.values())];
    // console.log(this.slush);
    // console.log(this.generators);
    // console.log(this.upgrades);
  }
  findBest() {
    return this.slush.filter(item => item.checkAvailable())
      .reduce((prev, curr) => prev.getValue(this.rate) < curr.getValue(this.rate) ? prev : curr);
  }
  buildGenerators() {
    const gens = [];
    gens.push(new ParticleGenerator('I', 1e1, 1, 1.12, []));
    gens.push(new ParticleGenerator('II', 1e2, 5, 1.12, [gens[0]]));
    gens.push(new ParticleGenerator('III', 1e3, 10, 1.12, [gens[1]]));
    gens.push(new ParticleGenerator('IV', 1e4, 25, 1.12, [gens[2]]));
    gens.push(new ParticleGenerator('V', 1e5, 50, 1.13, [gens[3]]));
    gens.push(new ParticleGenerator('VI', 1e6, 100, 1.14, [gens[4]]));
    gens.push(new ParticleGenerator('VII', 1e7, 250, 1.14, [gens[5]]));
    gens.push(new ParticleGenerator('VIII', 1e8, 500, 1.14, [gens[6]]));
    gens.push(new ParticleGenerator('IX', 1e9, 750, 1.15, [gens[7]]));
    gens.push(new ParticleGenerator('X', 1e10, 1000, 1.15, [gens[8]]));
    gens.forEach(gen => {
      const basic = new BasicUpgrade(gen, 2, 1e5 * gen.power, [gen]);
      const basic2 = new BasicUpgrade(gen, 3, 1e7 * gen.power, [gen, basic/*, xBasic3x*/]);
      const boost = new BoostUpgrade(gen, 0.05, 10, 1e3 * gen.power, [gen]);
      const boost2 = new BoostUpgrade(gen, 0.25, 25, 1e5 * gen.power, [gen, boost/*, xBoost2*/]);
      const boost3 = new BoostUpgrade(gen, 1, 50, 1e7 * gen.power, [gen, boost2/*, xBoost3*/]);
      const boost4 = new BoostUpgrade(gen, 2.5, 100, 1e9 * gen.power, [gen, boost3/*, xBoost4*/]);
      gens.forEach(source => {
        if (gen !== source) {
          const synergy = new SynergyUpgrade(gen, Math.floor(1e8 * source.power * gen.price / (source.price * gen.power)),
            [gen, source/*, xSyn(source)*/], source);
        }
      });
    });
    // this.generators = gens;
    // this.upgrades = Array.from(Upgrade.list.values());

    // let test = JSON.stringify(this.upgrades[0]);
    // console.log(test);
    // let temp = Upgrade.fromJSON(JSON.parse(test));
    // console.log(this.upgrades[0].name);
    // console.log(temp.name);
    // console.log(Upgrade.list.has(this.upgrades[0].name));

  }
  update({ interval }) {
    this.getTotalRate();
    this.current += this.rate * interval / 1000;
    this.total += this.rate * interval / 1000;
    this.updateEfficiency();
  }
  updateEfficiency() {
    this.generators.forEach((gen) => {
      gen.efficiency = Math.floor(gen.getValue(this.rate));
      // gen.efficiency = Math.floor(gen.getNextCost()*(1/this.rate+1/gen.getBaseRate()));
      if (this.efficient == null) {
        this.efficient = gen;
      } else if (gen.efficiency < this.efficient.efficiency) {
        this.efficient = gen;
      }
    });
  }
  save() {
    this.data = JSON.stringify({
      generators: [...this.generators],
      current: this.current,
      total: this.total
    });
    localStorage.setItem(storageKey, this.data);
    // console.log('Saving.. ');
  }
  getTotalRate() {
    this.rate = this.generators.reduce((rate, gen) => {
      rate += gen.getTotalRate();
      return rate;
    }, 0);
    return this.rate;
  }
}
