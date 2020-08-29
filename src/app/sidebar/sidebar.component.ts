import { Component, AfterViewInit} from '@angular/core';
import { TextService } from '../text.service';
import { SelectedFeatureService } from '../selected-feature.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [ TextService ],
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements AfterViewInit{

  constructor(
    private textService: TextService,
    private selectedFeatureService: SelectedFeatureService
  ) { }
  
  events: string[] = [];
  opened: boolean;

  previewMap$ = this.selectedFeatureService.selectedFeature.pipe(
    switchMap(feature => this.textService.getOccurences(feature.get('name2'))),
    map(list => {
      return this.textService.getPreviews(list)
    })
  )

  ngAfterViewInit() {

    this.previewMap$.subscribe(previewMap => console.log(previewMap))
  
  }

}
