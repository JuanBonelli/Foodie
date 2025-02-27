import { TestBed } from '@angular/core/testing';

import { TopbarConfigurationService } from './topbar-configuration.service';

describe('TopbarConfigurationService', () => {
  let service: TopbarConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopbarConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
