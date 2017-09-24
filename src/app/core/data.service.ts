import { PrestigeService } from './prestige.service';
import { ParticleGenerator } from '../models/particle-generator.model';
import { BasicUpgrade, BoostUpgrade, SynergyUpgrade, Upgrade, UpgradeType } from '../models/upgrade.model';
import { Injectable } from '@angular/core';

const storageKey = 'nucleo-fusion';

@Injectable()
export class DataService {
  public sessionTime = Date.now();
  public loadTime = Date.now();
  public startTime = Date.now();
  public generators: ParticleGenerator[];
  public upgrades: UpgradeType[];
  public current: number;
  public total: number;
  public rate: number;
  public currentExotic = 0;
  public exoticProd = 1;
  public currentVoid = 0;
  public voidProd = 1;
  public earnableVoid = 0;
  private data;
  public efficient: ParticleGenerator = null;
  public slush = [];

  constructor(private prestigeService: PrestigeService) {
    this.data = localStorage.getItem(storageKey);
    this.initialize(JSON.parse(this.data));
    this.getTotalRate();
  }

  initialize(data) {
    // TODO: Rewrite to run buildGenerators every load and overwrite data from save
    this.sessionTime = Date.now();
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
      this.currentExotic = this.currentExotic || data.currentExotic || 0;
      this.exoticProd = this.prestigeService.calcExoticProd(this.currentExotic);
      this.currentVoid = this.currentVoid || data.currentVoid || 0;
      this.earnableVoid = this.prestigeService.calcVoid(this.currentExotic);
      this.voidProd = this.currentVoid * 0.01;
      this.total = data.total || this.current;
      this.startTime = data.startTime || this.startTime || Date.now();

    }
    if (this.generators.length === 0) {
      this.buildGenerators();
    }
    // this.buildGenerators();
    this.save();
    this.generators = [...Array.from(ParticleGenerator.list.values())];
    this.upgrades = [...Array.from(Upgrade.list.values())];
    this.upgrades.sort((a, b) => a.getCost() - b.getCost());
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
      total: this.total,
      currentExotic: this.currentExotic,
      currentVoid: this.currentVoid,
      startTime: this.startTime
    });
    localStorage.setItem(storageKey, this.data);
    // console.log('Saving.. ');
  }
  getTotalRate() {
    this.rate = this.generators.reduce((rate, gen) => {
      rate += gen.getTotalRate();
      return rate;
    }, 0);
    this.rate *= Math.max(1, this.exoticProd);
    this.rate *= Math.max(1, this.voidProd);
    return this.rate;
  }
  exoticPrestige() {
    const current = this.current;
    const exotic = this.prestigeService.calcExotic(current);
    this.currentExotic += exotic;
    this.initialize({});
    this.exoticProd = this.prestigeService.calcExoticProd(this.currentExotic);
    this.earnableVoid = this.prestigeService.calcVoid(this.currentExotic);
  }
  voidPrestige() {
    const current = this.current;
    const voidParticles = this.prestigeService.calcVoid(this.currentExotic);
    this.currentVoid += voidParticles;
    this.initialize({});
    this.currentExotic = 0;
    this.exoticProd = this.prestigeService.calcExoticProd(this.currentExotic);
    this.voidProd = 1 + this.currentVoid * 0.01;
  }
}
