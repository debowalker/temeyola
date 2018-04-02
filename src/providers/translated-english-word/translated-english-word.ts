import { Injectable } from '@angular/core';

@Injectable()
export class TranslatedEnglishWordProvider {
   public document:string
   public word:string
   public meaning:string
   public example:string
   public exampleMeaning:string
   public toSubmit:Translation
  constructor(word:string,meaning:string,example:string,exampleMeaning:string,grossEnglishWords,rand:number) {

    this.word=word
    this.meaning=meaning
    this.example=example
    this.exampleMeaning=exampleMeaning
    let selectedEnglishword=grossEnglishWords[rand]
    this.word=selectedEnglishword.word
    this.toSubmit={
                    word:this.word,
                    meaning:this.meaning,
                    example:this.example,
                    exampleMeaning:this.exampleMeaning

                  }



  }


}

class Translation {
  public word:string
  public meaning:string
  public example:string
  public exampleMeaning:string
  constructor(word:string, meaning:string,example:string,exampleMeaning:string){
    this.word=word
    this.meaning=meaning
    this.example=example
    this.exampleMeaning=exampleMeaning
  }

}
