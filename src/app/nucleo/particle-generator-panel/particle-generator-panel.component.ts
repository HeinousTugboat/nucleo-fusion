import { ParticleGenerator } from '../../models/particle-generator.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-particle-generator-panel',
  templateUrl: './particle-generator-panel.component.html',
  styleUrls: ['./particle-generator-panel.component.css']
})
export class ParticleGeneratorPanelComponent implements OnInit {
  @Input() gens: ParticleGenerator[];
  constructor() { }

  ngOnInit() {
  }

}
