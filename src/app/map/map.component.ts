import { Component, ViewChild } from '@angular/core';
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {
  defaults as defaultControls,
  Attribution,
  ScaleLine
} from "ol/control";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from "ol/interaction";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// import { GeoobjectsComponent } from '../geoobjects/geoobjects.component';
import { GeojsonService } from '../geojson.service';
import  GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [GeojsonService]
})
export class MapComponent {

  // @ViewChild(GeoobjectsComponent)
  // private geoobjectsComponent: GeoobjectsComponent;

  constructor(private geojsonService: GeojsonService) { }

  ngAfterViewInit() {

    var geojsonObject = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [6625543.68, 4367432.57]
          },
          "properties": {
              "name": "Tūs"
          }
      }, {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [7699975.30, 4098543.91]
          },
          "properties": {               
            "name": "Kabul"
        }
      }]
    };

    var features = (new GeoJSON()).readFeatures(geojsonObject);

    var vectorSource = new VectorSource({
      features: features
    });
    
    var vectorLayer = new VectorLayer({
      source: vectorSource
    });

    if (typeof features !== 'undefined' && features.length > 0) {
      console.log('The Array "features" is defined and has ' + features.length + ' Feature objects.')
      console.log(features.properties)
    } else {
      console.log('features is undefined! :(')
    }

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      controls: defaultControls({
        attribution: false
      }).extend([
        new Attribution({
          collapsible: true
        }),
        new ScaleLine()
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      view: new View({
        center: fromLonLat([59.56, 36.45]),
        zoom: 4,
        minZoom: 2
      })
    });
  }

}
