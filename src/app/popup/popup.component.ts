import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';


// This component contains the logic for the pop-up windows that appear when a place is clicked on the map.
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements AfterViewInit {

  /* The "@ViewChild()" property decorator grants the pop-up component access to the properties and 
  methods of the ng-bootstrap directive "NgbPopover" that is used in popup.component.html. */
  @ViewChild('popover', { static: false }) ngbPopover: NgbPopover;
  /* The "@ViewChild()" property decorator grants the pop-up component 
  access to the underlying native HTML element. */
  @ViewChild('popup', { static: false }) popupElement: ElementRef;

  /* Property storing the OpenLayers overlay element containing the pop-up.
  The overlay is added to the map in map.component.ts. */
  popup: Overlay;
  // Property storing the English name of the selected place.
  placeName: string;
  // Property storing the Persian name of the selected place.
  persianName: string;

  ngAfterViewInit() {

    /* An OpenLayers OverLay element is saved in the popup property. */
    this.popup = new Overlay({
      element: this.popupElement.nativeElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, 0]
    });

  }

  // This method is called – in the map component – when a place is clicked.
  showPopup(feature: Feature) {
      // The English and Persian names of the passed place (feature) are saved in the respective properties.
      this.placeName = feature.get('name');
      this.persianName = feature.get('name2');
      // The position of the pop-up (OpenLayers OverLay) is set using the coordinates of the passed feature.
      this.popup.setPosition(feature.getGeometry().getCoordinates());
      // The English name of the selected place is set as the title of the pop-up.
      this.ngbPopover.popoverTitle = this.placeName;
      // The pop-up is opened.
      this.ngbPopover.open();
  }

}
