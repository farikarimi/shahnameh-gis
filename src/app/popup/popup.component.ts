import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements AfterViewInit {

  @ViewChild('popupElement') popupElement: NgbPopover;

  popup;
  feature: Feature;

  ngAfterViewInit() {

    this.popup = new Overlay({
      // element: this.popupElement.nativeElement, // IDK what's this
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, 0]
    });

  }

showPopup(feature) {
    if (feature) {
      this.feature = feature;
      const coordinates = feature.getGeometry().getCoordinates();
      // this.popup.setPosition(coordinates);
      // show popup on map
      this.popupElement.open();
    }
  }

}
