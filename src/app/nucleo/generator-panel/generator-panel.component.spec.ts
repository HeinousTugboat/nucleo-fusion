import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorPanelComponent } from './generator-panel.component';

describe('GeneratorPanelComponent', () => {
  let component: GeneratorPanelComponent;
  let fixture: ComponentFixture<GeneratorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
