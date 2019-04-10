import { Component, Input} from '@angular/core';
// import { MapComponent } from '../map/map.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // @Input() map: MapComponent;

  events: string[] = [];
  opened: boolean;
}
