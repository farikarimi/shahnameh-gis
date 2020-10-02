import { Component, OnInit } from '@angular/core';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import { GeojsonService } from '../geojson.service';

@Component({
  selector: 'app-geoobjects',
  templateUrl: './geoobjects.component.html',
  providers: [ GeojsonService ],
  styleUrls: ['./geoobjects.component.css']
})

export class GeoobjectsComponent implements OnInit {

  geojson: GeoJSON;
  vectorLayer;

  constructor(private geojsonService: GeojsonService) { }

  ngOnInit() {

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'pin.png',
      }),
    });

    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: (new GeoJSON({featureProjection:"EPSG:3857"}))
        .readFeatures(this.geojsonService.getGeojson())
      })/* ,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'pin.png',
        })
      }) */
    });
    
  }

}
