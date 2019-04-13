import { Component, ViewChild, AfterViewInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {
  defaults as defaultControls,
  Attribution,
  ScaleLine
} from 'ol/control';
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { GeoobjectsComponent } from '../geoobjects/geoobjects.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {

  @ViewChild(GeoobjectsComponent)
  geoobjectsComponent: GeoobjectsComponent;

  ngAfterViewInit() {

    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })/*,
        this.geoobjectsComponent.vectorLayer*/
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

    // add the VectorLayer with the geo-objects to the map
    this.geoobjectsComponent.setVectorLayer();
    map.addLayer(this.geoobjectsComponent.vectorLayer);
  }

}
