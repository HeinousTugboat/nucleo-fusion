import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSettingsComponent } from './lab-settings.component';

describe('LabSettingsComponent', () => {
  let component: LabSettingsComponent;
  let fixture: ComponentFixture<LabSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
