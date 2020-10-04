import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()

export class TextService {

  private textURL: string = 'assets/data/frdvsi.txt';
  public shahnamehText$ = this.http.get(this.textURL, {responseType: 'text'}).pipe(map(txt => {return txt}));
  public currentIndexList: number[] = [];
  txt: string;
  currentName: string;

  constructor(private http: HttpClient) { }
  
  public getOccurences(substr: string) {
    this.currentName = substr;
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
    this.currentIndexList = indexList;
    return indexList;
  }

  //TODO: change from subscribe to pipe/map
  public getPreviews(indices) {
    let previews: string[] = [];
    let subscription = this.shahnamehText$.subscribe(shText => 
      indices.forEach(index => {
        let substrArray = [
          '...',
          shText.substr(index-100, 100), 
          '<mark><b>',
          shText.substr(index, this.currentName.length),
          '</b></mark>',
          shText.substr(index+this.currentName.length, 100),
          '...'
        ]
        let previewText = substrArray.join('');
        previews.push(previewText);
      })
    );
    setTimeout(function(){
      subscription.unsubscribe()
    }, 5000);
    return previews;
   }
   
   public tagText(){
     let txt: string;
     let prefix1: string = '<span id="occ-';
     let prefix2: string = '" #occInText ><mark><b>';
     let suffix: string = '</b></mark></span>';
     let lenSum: number = prefix1.length + prefix2.length + suffix.length;
     let addLen: number = 0;
     return this.shahnamehText$.pipe(
       map(shText => {
        this.currentIndexList.forEach(i => {
          shText = [
            shText.slice(0, i+addLen), 
            prefix1, i.toString(), prefix2, 
            shText.slice(i+addLen, i+this.currentName.length+addLen),
            suffix,
            shText.slice(i+this.currentName.length+addLen)
          ].join('');
          addLen += lenSum + i.toString().length
        });
        addLen = 0;
        return shText;
       }));
   }

}
