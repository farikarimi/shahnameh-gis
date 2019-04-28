import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output} from '@angular/core';
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

  popup: Overlay;
  placeName: string;

  ngAfterViewInit() {

    this.popup = new Overlay({
      element: this.popupElement.nativeElement,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, 0]
    });

  }

  showPopup = (feature: Feature) : void => {
    if (feature && feature !== undefined) {
      this.placeName = feature.get('name');
      this.ngbPopover.ngbPopover = this.placeName;
      this.popup.setPosition(feature.getGeometry().getCoordinates());
      this.ngbPopover.open();
    }
  }

}
