import { TestBed } from '@angular/core/testing';

import { FtthService } from './ftth.service';

describe('FtthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FtthService = TestBed.get(FtthService);
    expect(service).toBeTruthy();
  });
});
