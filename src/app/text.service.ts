import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()

export class TextService {

  private textURL: string = 'assets/data/frdvsi.txt';

  constructor(private http: HttpClient) { }
  
  public getOccurences(substr) {
   return this.http.get(this.textURL, {responseType: 'text'}).pipe(
      map(txt => this.findAllInText(substr, txt))
     );
  }

  findAllInText(substr, txt) {
    let re = new RegExp(substr, 'g');
    console.log('text: ' + txt.substr(0, 100) + '...\n\nsearch term: ' + substr);
    let matches = txt.matchAll(re);
    let indexList = [];
    matches = Array.from(matches);
    if (matches.length) {
      matches.forEach(match => {
        console.log('found ' +  match +  ' at index ' +  match.index);
        indexList.push(match.index);
      });
      console.log(indexList.length + ' occurrence(s) found');
    } else {
      console.log('no occurrences found!');
    }
    return indexList;
  }

}
