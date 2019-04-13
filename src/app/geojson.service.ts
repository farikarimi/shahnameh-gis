import { Injectable } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import {features, type} from '../data/places.json';

@Injectable()

export class GeojsonService {
  
  geojson = GeoJSON;

  constructor() {}

  getGeojson() {
    return {features, type};
  }

}
