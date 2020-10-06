import { Component, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import { defaults as defaultControls, Attribution, ScaleLine } from 'ol/control';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import { GeoobjectsComponent } from '../geoobjects/geoobjects.component';
import { PopupComponent } from '../popup/popup.component';
import { SelectedFeatureService } from '../selected-feature.service';


/* This component contains the logic for the map in the application. 
The map component is a child component of the sidebar component: 
It's embedded in the sidebar component view (sidebar.component.html). */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  /* The output property "newFeature" emits a new value, every time a feature (place on the map) 
  is clicked. The parent component (sidebar) listens for when the property's value changes
  through event binding in the DOM (sidebar.component.html). */
  @Output()
  newFeature: EventEmitter<Feature> = new EventEmitter<Feature>();
  
  /* The next two lines give the map component access to the public properties and methods of 
  its child components "popup" and "geoobjects".*/
  @ViewChild(PopupComponent, { static: false }) popupComponent: PopupComponent;
  @ViewChild(GeoobjectsComponent, { static: false }) geoobjectsComponent: GeoobjectsComponent;

  constructor(
    /* This service enables the map component to asynchronously send data (the selected feature) 
    to its parent, the sidebar component. */
    private selectedFeatureService: SelectedFeatureService
  ) { }

  ngAfterViewInit() {

    // The constant "map" contains a map object from the OpenLayers Javascript library.
    const map = new Map({
      target: 'map',
      layers: [
        // The first layer of the map object is a map from OpenStreetMap.
        new TileLayer({
          source: new OSM()
        })
      ],
      controls: defaultControls({
        attribution: false
      }).extend([
        new Attribution({
          collapsible: true
        }),
        // Scale line to indicate the scale of the map
        new ScaleLine()
      ]),
      // Control buttons for zooming in and out on the map
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      view: new View({
        // When the page is (re)loaded, the map is centered and zoomed on Iran and neighboring regions.
        center: fromLonLat([59.56, 36.45]),
        zoom: 4,
        minZoom: 2
      })
    });

    // The layer containing the places (geoobjects) is added to the map.
    map.addLayer(this.geoobjectsComponent.vectorLayer);
    // An overlay containing the popups – which appear when a place is clicked – is added to the map.
    map.addOverlay(this.popupComponent.popup);

    // When the map is clicked
    map.on('click', (event) => {
      // the (expected) feature at the clicked pixel is saved in the "feature" variable,
      var feature: Feature = map.forEachFeatureAtPixel(event.pixel,
        (feature) => {
          return feature;
        });
      console.log(feature);
      // if the feature is not null and is not undefined
      if (feature && feature !== undefined) {
        // the popup for the current place is shown,
        this.popupComponent.showPopup(feature);
        // the output property emits a new value – signalling the components binding to it to take some action –
        this.newFeature.emit();
        /* and the "selectedFeature" service – or more precisely its "selectedFeature" property – 
        emits the currently selected feature to its subscribers. */
        this.selectedFeatureService.selectedFeature.next(feature);
      }

    });

  }

}
