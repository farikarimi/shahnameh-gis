import { Component, AfterViewInit, ViewChild, Inject} from '@angular/core';
import { TextService } from '../text.service';
import { SelectedFeatureService } from '../selected-feature.service';
import { switchMap, map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { DOCUMENT } from '@angular/common';

// This component contains the logic for the sidebar. This component is a child of the app component.
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

  /* The "@ViewChild()" property decorator grants the sidebar component access to the properties and 
  methods of the Material Design component "MatSidenav" that is embedded in sidebar.component.html. */
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  /* The boolean property "showWelcomeMessage" is the condition for showing the welcome message in the 
  sidebar. It's only true if a place has not been clicked yet. */
  showWelcomeMessage: boolean = true;
  
  // Condition for showing the complete text of the Shahnameh when "Show more" is clicked
  showText$ = new BehaviorSubject<boolean>(false);
  
  // Condition for showing the list of occurrences when a place is clicked
  showOccList$ = new BehaviorSubject<boolean>(false);
  
  // Property storing the Persian name of the selected place.
  featureName$ = this.selectedFeatureService.selectedFeature.pipe(
    map(feature => {return feature.get('name2')})
  );
  
  /* "previewMap$" is an observable emitting a list of previews of the text passages that contain an occurrence of 
  the selected place name, every time a place is clicked on the map */
  // The "selectedFeature" property of the "selectedFeature" service emits a feature every time a place is clicked
  previewMap$ = this.selectedFeatureService.selectedFeature.pipe(
    // Filtering out undefined values
    filter(feature => feature),
    /* The "getOccurrences()" method of the text service returns a list containing the indices (start positions) 
    of all of the occurrences of the passed string (Persian name of the selected place). */
    switchMap(feature => this.textService.getOccurrences(feature.get('name2'))),
    // The "getPreviews()" method returns a list of text previews for the passed list of indices
    map(list => this.textService.getPreviews(list))
  );
  
  /* The "taggedText$" observable emits a text of the Shahnameh, in which all occurrences of the selected place 
  are tagged – with HTML tags with unique IDs – every time a place is clicked. */
  taggedText$ = this.textService.tagText().pipe(
    map(txt => txt)
  );

  constructor(
    // Using the "@Inject()" property decorator, the component gains access to the DOM document.
    @Inject(DOCUMENT) private document: Document,
    private textService: TextService,
    private selectedFeatureService: SelectedFeatureService
  ) {}


  ngAfterViewInit() {
    this.previewMap$.subscribe(previewMap => console.log(previewMap));
  }


  /* This method is called when the "Show more" button of a preview is clicked. 
  "i" is the index of the selected preview in the preview list. */
  showMoreText(i: number) {
    // The "showOccList$" property's value is set to false, so that the list is hidden.
    this.showOccList$.next(false);
    
    // The "showText$" property's value is set to true, so that the complete text is shown.
    this.showText$.next(true);
    
    /* The start position of the selected occurrence is saved in the "positionInText" variable. The "currentIndexList" 
    property of the text service contains the start positions of all occurrences of the selected place name. */
    let positionInText = this.textService.currentIndexList[i];
    console.log('position of the occurrence in the text: ' + positionInText);
    
    // The ID used in the HTML <span> tag to identify the specific occurrence is constructed.
    let id = ['occ-', positionInText.toString()].join('');
    console.log('element id: ', id);
    
    /* The time out allows the "taggedText$" property's current observable sequence to be terminated, before its value 
    is used in the next statement. */
    setTimeout(function(){
      // The selected occurrence is scrolled into view. 
      this.document.getElementById(id).scrollIntoView();
    }, 5000);
  }


  // This method is called when a new place is clicked.
  setNewFeature() {
    // The "showWelcomeMessage" property's value is set to false, to hide the welcome message.
    this.showWelcomeMessage = false;
    
    // The sidebar is opened.
    this.sidenav.open();
    
    // The "showOccList$" property's value is set to true to show the list of occurrences.
    this.showOccList$.next(true);
    
    // The "showText$" property's value is set to false to hide the complete text of the Shahnameh (if it's viewed).
    this.showText$.next(false);
  }


  // This method is called when the arrow button is clicked to return to the list of occurrences for the selected place name.
  backToOccList() {
    // The "showText$" property's value is set to false to hide the complete text of the Shahnameh.
    this.showText$.next(false);
    
    // The "showOccList$" property's value is set to true to show the list of occurrences.
    this.showOccList$.next(true);
  }
  
}
