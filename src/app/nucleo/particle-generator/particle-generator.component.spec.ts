import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleGeneratorComponent } from './particle-generator.component';

describe('GeneratorComponent', () => {
  let component: ParticleGeneratorComponent;
  let fixture: ComponentFixture<ParticleGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticleGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
