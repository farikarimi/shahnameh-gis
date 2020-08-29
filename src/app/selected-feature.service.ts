import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Feature from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})
export class SelectedFeatureService {

  selectedFeature = new Subject<Feature>();

}
