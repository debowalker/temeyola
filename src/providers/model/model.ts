// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

export class Language {

  public languageId:number
  public language:string
  public countryId:number[]
  public languageDescription:string

  constructor(languageId:number,language:string,countryId:number[],languageDescription:string) {
    this.languageId=languageId
    this.language=language
    this.countryId=countryId
    this.languageDescription=languageDescription
  }

}

export class Translation {

  translationId:string
  userName:string
  wordId:number
  meaning:string
  languageId:number
  example:string
  exampleMeaning:string
  dateOfRecord

  constructor(translationId,userName:string,wordId:number,meaning:string,
              languageId:number,example:string,exampleMeaning:string,dateOfRecord?) {
    this.translationId=translationId
    this.userName=userName
    this.wordId=wordId
    this.meaning=meaning
    this.languageId=languageId
    this.example=example
    this.exampleMeaning=exampleMeaning
    this.dateOfRecord=dateOfRecord
  }

}

export class EnglishWords{

  public wordId:number
  public word:string
  public pos:string
  public description:string

  constructor(wordId:number,word:string,pos:string,description:string){
    this.wordId=wordId
    this.word=word
    this.pos=pos
    this.description=description
  }
}

export class Users{

  public dateOfRecord:string
  public fullName:string
  public gender:string
  public nativeLanguage:string
  public password:string
  public phone:string
  public userName:string
  public email: string
  public userType:string

  constructor(dateOfRecord:string,fullName:string,gender:string,nativeLanguage:string,password:string,
              phone:string,userName:string,email: string,userType:string){
        this.dateOfRecord=dateOfRecord
        this.fullName=fullName
        this.gender=gender
        this.nativeLanguage=nativeLanguage
        this.password=password
        this.phone=phone
        this.userName=userName
        this.email=email
        this.userType=userType

  }
}

export class Country{

  public countryId:number
  public country:string

  constructor(countryId:number,country:string){
    this.countryId=countryId
    this.country=country
  }
}
