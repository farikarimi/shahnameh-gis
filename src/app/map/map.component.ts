import { Component } from '@angular/core';
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {
  defaults as defaultControls,
  Attribution,
  FullScreen/*,
  ScaleLine*/
} from "ol/control";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from "ol/interaction";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  ngAfterViewInit() {
    // console.log(`OnInit`);

    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })/*,
        vectorLayer*/
      ],
      controls: defaultControls({
        attribution: false
      }).extend([
        new Attribution({
          collapsible: true
        }),
        new FullScreen()/*,
        new ScaleLine()*/
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
