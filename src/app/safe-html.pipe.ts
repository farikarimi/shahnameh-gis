// Source: https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {}

 public transform(value: any, type: string): any {
     const sanitizedContent = DOMPurify.sanitize(value, {ADD_ATTR: ['id']});
     return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);

  }
}
