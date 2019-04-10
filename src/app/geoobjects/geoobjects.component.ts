import { Component, OnInit } from '@angular/core';
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

  error: any;
  vectorLayer : any;

  constructor(private geojsonService: GeojsonService) { }

  ngAfterViewInit() {

    var features = (new GeoJSON()).readFeatures(this.geojsonService.getGeojson('../data/places.json'));

    var vectorSource = new VectorSource({
      features: features
    });
    
    this.vectorLayer = new VectorLayer({
      source: vectorSource
    });

    function printFeatures () {
      if (typeof features !== 'undefined' && features.length > 0) {
        console.log('features is defined and has at least one element!')
      } else {
        console.log('features is undefined! :(')
      }
    }
  }
  
}
