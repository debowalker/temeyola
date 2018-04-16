// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LanguagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanguagesProvider {
  public languageId:string
  public langauge:string
  public countryId:number[]
  constructor(languageId:string,langauge:string,countryId:number[]) {
    this.languageId=languageId
    this.langauge=langauge
    this.countryId=countryId
  }

}
