import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Feature from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})

export class SelectedFeatureService {

  selectedFeature = new BehaviorSubject<Feature>(undefined);
  // newFeature = new BehaviorSubject<boolean>();

}
