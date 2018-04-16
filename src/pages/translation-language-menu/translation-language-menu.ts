import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';

import { Storage } from '@ionic/storage';
import { MainPage } from '../pages';
//controllers
import {LoadingController} from 'ionic-angular'
//helpers
import {FormatLanguageForTranslationLanguageMenu} from '../../providers/helper/helper'

@IonicPage()
@Component({
  selector: 'page-translation-language-menu',
  templateUrl: 'translation-language-menu.html'
})
export class TranslationLanguageMenuPage {
    firestoreData;
    firestoreList;
    firestoreQuery;

    authState;
   language:Language[]=[]
   translation:Translation[]=[]
   country:Country[]=[]
   public formattedLanguage:Object[]=[]
   firebaseRetrieveState=false
  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              private storage: Storage) {
        if (this.formattedLanguage.length==0){
          this.loading()
        }
  }
  ngOnInit() {


       this.firestore.query('Translation').on().subscribe((data0) => {
           for (let a0 of data0) {
             let trans=new Translation(a0.translationId,a0.userName,a0.wordId,a0.meaning,
                                       a0.languageId,a0.example,a0.exampleMeaning,
                                        a0.dateOfRecord)
             this.translation.push(trans)
           }
           this.firestore.query('Country').on().subscribe((data1) => {
               for (let b0 of data1) {
                 let count=new Country(b0.countryId,b0.country)
                 this.country.push(count)
               }

           });
           this.firestore.query('Language').on().subscribe((data2) => {
               for (let c0 of data2) {
                 let lang=new Language(c0.languageId,c0.language,c0.countryId,c0.languageDescription)
                 this.language.push(lang)
               }

             if (this.translation.length>0 && this.country.length>0 && this.language.length>0 && this.firebaseRetrieveState==false){
               let formattedLanguage=new FormatLanguageForTranslationLanguageMenu(this.translation,this.country,
                                                                                  this.language)
               for (let d0 of formattedLanguage.mes0){
                 this.formattedLanguage.push(d0)
               }
               this.firebaseRetrieveState=true
             }

           });


       });


       this.auth.isAuthenticated().subscribe((isAuth) => {
           this.authState = isAuth;
       });


   }

   translatePage(language){
     for(let a0 of this.formattedLanguage){
       if (a0['language']==language){
         this.storage.remove('translationLanguageId');
         this.storage.remove('translationLanguage');
         this.storage.set('translationLanguageId', a0['languageId']);
         this.storage.set('translationLanguage', a0['language']);
         this.navCtrl.push(MainPage);
       }
     }
   }

   loading(){
     let loader=this.loadingCtrl.create(
       {
         content:"Connecting...",
         duration:1000
       }
     )
     loader.present()
   }

   // getLanguageObject(event){
   //   console.log(this.formattedLanguage)
   //   console.log(this.language)
   //   console.log(this.translation)
   //   this.searchedWord=event
   //   this.searched=[]
   //    for (let a0 of this.formattedLanguage){
   //      if (a0['language'].toLowerCase().startsWith(this.searchedWord.toLowerCase())){
   //        this.searched.push(a0)
   //      }
   //    }
   // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslationLanguageMenuPage');
  }

}

class Translation {

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

class Country{

  public countryId:number
  public country:string

  constructor(countryId:number,country:string){
    this.countryId=countryId
    this.country=country
  }
}

class Language {

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
