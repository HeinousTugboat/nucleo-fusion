import { DataService } from '../../core/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { ParticleGenerator } from '../../models/particle-generator.model';

@Component({
  selector: 'app-particle-generator',
  templateUrl: './particle-generator.component.html',
  styleUrls: ['./particle-generator.component.css']
})
export class ParticleGeneratorComponent implements OnInit {
  @Input() gen: ParticleGenerator;

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  purchase(gen: ParticleGenerator) {
    const cost = gen.getNextCost();
    if (cost <= this.dataService.current) {
      this.dataService.current -= cost;
      gen.purchase();
    }
    this.dataService.save();
  }

}
