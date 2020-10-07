import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Feature from 'ol/Feature';

@Injectable({
  providedIn: 'root'
})

/* SelectedFeatureService is used for the child-to-parent communication between 
the map component (child) and the sidebar component (parent). */
export class SelectedFeatureService {

  /* The "selectedFeature" property is a Subject (special type of Observable) that emits 
  the selected feature when it's clicked. The feature is passed to it in the map component. 
  The value emissions are subscribed to in the sidebar component. */
  selectedFeature = new BehaviorSubject<Feature>(undefined);

}
