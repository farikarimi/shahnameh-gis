import { TestBed } from '@angular/core/testing';

import { GeojsonService } from './geojson.service';

describe('GeojsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeojsonService = TestBed.get(GeojsonService);
    expect(service).toBeTruthy();
  });
});
