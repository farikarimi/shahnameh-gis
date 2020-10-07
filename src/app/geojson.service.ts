import { Injectable } from '@angular/core';
import {features, type} from '../assets/data/new_places.json';

// Service for reading the GeoJSON file containing the places.
@Injectable()
export class GeojsonService {

  constructor() {}

  // The method returns the features (places) and type imported from the GeoJSON file "new_places.json".
  getGeojson() {
    return {features, type};
  }

}
