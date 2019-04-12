import { Component } from '@angular/core';
import { GeojsonService } from '../geojson.service';
import  GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-geoobjects',
  templateUrl: './geoobjects.component.html',
  providers: [ GeojsonService ],
  styleUrls: ['./geoobjects.component.css']
})
export class GeoobjectsComponent {

  geojson: GeoJSON;
  vectorLayer;

  constructor(private geojsonService: GeojsonService) { }

  setGeojson() {
    this.geojsonService.getGeojson()
      .subscribe((geojson: GeoJSON) => this.geojson = geojson);
    }
  
  setVectorLayer() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.geojson.features
      })
    });
  }

}
