import { Component } from '@angular/core';
import { GeojsonService } from '../geojson.service';
import GeoJSON from 'ol/format/GeoJSON';
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

  // should save the data returned by getGeojson() in the geojson variable as a GeoJSON-object
  // setGeojson() {
  //   this.geojsonService.getGeojson()
  //     .subscribe((geojson: GeoJSON) => this.geojson = geojson);
  //   }

  // save the features array from the GeoJSON-object in the features property of the VectorSource
  setVectorLayer() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON()).readFeatures(this.geojsonService.getGeojson())
      })
    });
  }

  // another possible way without using the service that also doesn't work

  // setVectorLayer1() {
  //   this.vectorLayer = new VectorLayer({
  //     source: new VectorSource({
  //       url: '../data/places.json',
  //       format: GeoJSON
  //     })
  //   });
  // }

}
