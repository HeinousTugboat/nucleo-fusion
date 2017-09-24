import { TestBed, inject } from '@angular/core/testing';

import { PrestigeService } from './prestige.service';

describe('PrestigeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestigeService]
    });
  });

  it('should be created', inject([PrestigeService], (service: PrestigeService) => {
    expect(service).toBeTruthy();
  }));
});
