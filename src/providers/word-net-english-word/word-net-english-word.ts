// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WordNetEnglishWordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordNetEnglishWordProvider {
  public wordId:number
  public word:string
  public pos: string
  public description:string

  constructor(wordId:number,word:string,pos:string,description:string) {
    this.wordId=wordId
    this.word=word
    this.pos=pos
    this.description=description
  }

}
