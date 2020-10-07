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

  /* The "vectorLayer" property contains the geo-objects, i.e. the places. 
  This layer is added to the map in map.component.ts. */
  vectorLayer;

  // The GeoJSON service is used for accessing the GeoJSON file containing the places displayed on the map.
  constructor(private geojsonService: GeojsonService) { }

  ngOnInit() {
    
    /* A vector layer containing the features, i.e. places, from the GeoJSON file 
    is saved in the component's "vectorLayer" property. */
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        /* Using the EPSG:3857 or "World Geodetic System 1984" projected coordinate system, 
        which is also used by OpenStreetMap and GeoNames geographical database. */ 
        features: (new GeoJSON({featureProjection:"EPSG:3857"}))
        // Getting the features from the GeoJSON file via the "geojson" Service.
        .readFeatures(this.geojsonService.getGeojson())
      })
    });
    
  }

}
