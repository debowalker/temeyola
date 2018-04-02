// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WordNetEnglishWordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordNetEnglishWordProvider {

  public word:string
  public pos: string
  public description:string

  constructor(word:string,pos:string,description:string) {
    this.word=word
    this.pos=pos
    this.description=description
  }

}
