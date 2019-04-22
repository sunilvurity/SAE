import { TestBed } from '@angular/core/testing';

import { SocialactivityService } from './socialactivity.service';

describe('SocialactivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialactivityService = TestBed.get(SocialactivityService);
    expect(service).toBeTruthy();
  });
});
