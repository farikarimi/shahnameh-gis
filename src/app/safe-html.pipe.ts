import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

/* The "SafeHtml" Pipe is used to bypass the sanitization of values performed by Angular DomSanitizer. 
The Angular DomSanitizer helps to prevent XSS attacks by ensuring that the values are safe 
to use in the different DOM contexts, however, it's not very configurable. 

The code is copied from this blog post and slightly modified (accessed on October 5th 2020):
"Using Angular innerHtml to display user-generated content without sacrificing security":
https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/
*/

@Pipe({
  name: 'safeHtml'
})

export class SafeHtmlPipe implements PipeTransform {
  
  constructor(protected sanitizer: DomSanitizer) {}
  /* To be able to use certain HTML tags in a value an external sanitizer is used which is more configurable. */
  public transform(value: any, type: string): any {
    /* The passed value is sanitized by the XSS sanitizer library DOMPurify, with the second parameter 
    telling it to not remove "id" attributes from HTML tags. */
    const sanitizedContent = DOMPurify.sanitize(value, {ADD_ATTR: ['id']});
    /* The Angular sanitizer is told to bypass security and trust the given value – 
    which has already been sanitized by DOMPurify – to be safe HTML. */
    return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);

  }
}
