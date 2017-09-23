import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleGeneratorPanelComponent } from './particle-generator-panel.component';

describe('GeneratorPanelComponent', () => {
  let component: ParticleGeneratorPanelComponent;
  let fixture: ComponentFixture<ParticleGeneratorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticleGeneratorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleGeneratorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
