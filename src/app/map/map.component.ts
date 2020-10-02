import { Component, ViewChild, AfterViewInit, OnInit, EventEmitter, Output } from '@angular/core';
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


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {

  @Output()
  newFeature: EventEmitter<Feature> = new EventEmitter<Feature>();

  @ViewChild(PopupComponent, { static: false }) popupComponent: PopupComponent;
  @ViewChild(GeoobjectsComponent, { static: false }) geoobjectsComponent: GeoobjectsComponent;

  constructor(
    private selectedFeatureService: SelectedFeatureService
  ) { }

  ngAfterViewInit() {

    const map = new Map({
      target: 'map',
      layers: [
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
        new ScaleLine()
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      view: new View({
        center: fromLonLat([59.56, 36.45]),
        zoom: 4,
        minZoom: 2
      })
    });

    map.addLayer(this.geoobjectsComponent.vectorLayer);
    map.addOverlay(this.popupComponent.popup);

    map.on('click', (event) => {
      var feature: Feature = map.forEachFeatureAtPixel(event.pixel,
        (feature) => {
          return feature;
        });
      console.log(feature);
      if (this.popupComponent.ngbPopover.isOpen()) {
        this.popupComponent.ngbPopover.close()
      }
      if (feature && feature !== undefined) {
        this.popupComponent.showPopup(feature);
        this.newFeature.emit();
        this.selectedFeatureService.selectedFeature.next(feature);
      }

    });

  }

}
