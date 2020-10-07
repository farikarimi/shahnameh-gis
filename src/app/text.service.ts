import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


// The service is used for reading and processing the text of the Shahnameh.
@Injectable()
export class TextService {

  // Property storing the path to the TXT file of the Shahnameh.
  private textURL: string = 'assets/data/frdvsi.txt';
  
  // The text is returned by the HTTP get request as an observable and stored in the property
  public shahnamehText$ = this.http.get(this.textURL, {responseType: 'text'});
  
  // Property for storing the list of indices (start positions) of the occurrences of the selected place name
  public currentIndexList: number[] = [];
  
  // Property for storing the name of the selected place
  currentName: string;

  constructor(private http: HttpClient) { }
  
  // Returns the list of indices (start positions) of the occurrences of the selected place name
  public getOccurrences(substr: string) {
    // Saves the passed string (place name) in the "currentName" property
    this.currentName = substr;
    
    /* Passes the place name and the complete text to the "findAllInText()" method to receive 
    and return the index list. */
    return this.shahnamehText$.pipe(
     map(txt => this.findAllInText(substr, txt))
     );
  }


  /* Finds all occurrences of the passed string in the Shahnameh text and returns a list 
  containing all indices of the substring (place name) in the Shahnameh string. */
  findAllInText(substr, txt) {
    // The passed substring is saved in the "re" variable as a regular expression.
    let re = new RegExp(substr, 'g');
    console.log('text: ' + txt.substr(0, 100) + '...\n\nsearch term: ' + substr);
    
    /* The iterator of all the results of matching the Shahnameh text against 
    regular expression containing the place name is saved in "matches".*/
    let matches = txt.matchAll(re);
    
    // An empty array is created for storing the indices.
    let indexList = [];
    
    // The "matches" iterator is converted to an array.
    matches = Array.from(matches);

    // If matches is not empty
    if (matches.length) {
      // Add the index of each match/occurrence to the "indexList" array.
      matches.forEach(match => {
        console.log('found ' +  match +  ' at index ' +  match.index);
        indexList.push(match.index);
      });
      console.log(indexList.length + ' occurrence(s) found');
    } else {
      console.log('no occurrences found!');
    }
    // Save the index list in the "currentIndexList" property of the component.
    this.currentIndexList = indexList;
    // Return the index list.
    return indexList;
  }


  // Returns a list of text previews for the passed list of indices
  public getPreviews(indices) {
    // An empty array is created for storing the text previews.
    let previews: string[] = [];

    // The "shahnamehText$" observable is subscribed to.
    let subscription = this.shahnamehText$.subscribe(shText => 
      
      // For each index in the passed list of indices:
      indices.forEach(index => {
        // Assemble a string containing the preview text and HTML tags highlighting the place name
        let substrArray = [
          '...',
          shText.substr(index-100, 100).trimStart(), 
          '<mark><b>',
          shText.substr(index, this.currentName.length),
          '</b></mark>',
          shText.substr(index+this.currentName.length, 100).trimEnd(),
          '...'
        ]
        let previewText = substrArray.join('');
        
        // and add the preview text to the list of previews
        previews.push(previewText);
      })
    );
    
    // Unsubscribe from the observable after 5 seconds
    setTimeout(function(){
      subscription.unsubscribe()
    }, 5000);
    
    // Return the list of previews
    return previews;
   }
   

   // Adds HTML tags to identify and highlight every occurrence of the selected place name.
   public tagText(){
     // Variable storing the first part of the HTML string that should be prefixed to the place name
     let prefix1: string = '<span id="occ-';
     
     // Variable storing the second part of the HTML string that should be prefixed to the place name
     let prefix2: string = '"><mark><b>';
     
     // Variable storing the HTML string that should be suffixed to the place name
     let suffix: string = '</b></mark></span>';
     
     // Variable storing the total length of the HTML strings
     let lenSum: number = prefix1.length + prefix2.length + suffix.length;
     
     // Variable storing the total number of characters added to the text
     let addedLen: number = 0;
     
     // Add the HTML tags to the Shahnameh text and return the tagged text
     return this.shahnamehText$.pipe(
       map(shText => {
         // For each index in the current index list
         this.currentIndexList.forEach(i => {
           // add HTML tags to uniquely mark the occurrence of the place name
           shText = [
             shText.slice(0, i+addedLen), 
             // The index "i" is used in the "id" attribute of the span tag surrounding the occurrence
             prefix1, i.toString(), prefix2, 
             shText.slice(i+addedLen, i+this.currentName.length+addedLen),
             suffix,
             shText.slice(i+this.currentName.length+addedLen)
            ].join('');

            // Increase the number of characters added to the text
            addedLen += lenSum + i.toString().length
          });
          
          // Set the added length to 0 for the next place
          addedLen = 0;

          // Return the tagged text.
          return shText;
       }));
   }

}
