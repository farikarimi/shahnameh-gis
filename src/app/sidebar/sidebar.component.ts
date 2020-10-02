import { Component, AfterViewInit, OnChanges, SimpleChanges, OnInit, ViewChild, Inject, InjectionToken} from '@angular/core';
import { TextService } from '../text.service';
import { SelectedFeatureService } from '../selected-feature.service';
import { switchMap, map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [
    TextService,
    SelectedFeatureService 
  ],
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements AfterViewInit {

  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  
  events: string[] = [];
  opened: boolean;
  showWelcomeMessage: boolean = true;
  showText$ = new BehaviorSubject<boolean>(false);
  showOccList$ = new BehaviorSubject<boolean>(false);
  previewMap$ = this.selectedFeatureService.selectedFeature.pipe(
    filter(feature => feature),
    switchMap(feature => this.textService.getOccurences(feature.get('name2'))),
    map(list => {return this.textService.getPreviews(list)})
  );
  taggedText$ = this.textService.tagText().pipe(
    map(txt => {return txt})
  );

  constructor(
    private textService: TextService,
    private selectedFeatureService: SelectedFeatureService
  ) {}

  ngAfterViewInit() {
    this.previewMap$.subscribe(previewMap => console.log(previewMap));
    //this.taggedText$.subscribe(text => console.log(text));
  }

  showMoreText(i: number) {
    this.textService.tagText();
    this.showOccList$.next(false);
    this.showText$.next(true);
    let positionInText = this.textService.currentIndexList[i];
    console.log('position of the occurrence in the text: ' + positionInText);
    let id = ['occ-', positionInText.toString()].join('');
    console.log('element id: ', id);
  }

  setNewFeature() {
    this.showWelcomeMessage = false;
    this.sidenav.open();
    this.showOccList$.next(true);
    this.showText$.next(false);
  }

  backToOccList() {
    this.showText$.next(false);
    this.showOccList$.next(true);
  }
  
}
