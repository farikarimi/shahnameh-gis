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

  @ViewChild('popover') ngbPopover: NgbPopover;
  @ViewChild('popup') popupElement: ElementRef;

  popup;
  feature: Feature;

  ngAfterViewInit() {

    this.popup = new Overlay({
      element: this.popupElement.nativeElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, 0]
    });

  }

showPopup(feature) {
    if (feature) {
      this.feature = feature;
      const coordinates = feature.getGeometry().getCoordinates();
      this.popup.setPosition(coordinates);
      this.ngbPopover.toggle();
    }
  }

}
