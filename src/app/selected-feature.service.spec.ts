import { TestBed } from '@angular/core/testing';

import { SelectedFeatureService } from './selected-feature.service';

describe('SelectedFeatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedFeatureService = TestBed.get(SelectedFeatureService);
    expect(service).toBeTruthy();
  });
});
