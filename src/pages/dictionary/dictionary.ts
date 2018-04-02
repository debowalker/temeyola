import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';


@IonicPage()
@Component({
  selector: 'page-dictionary',
  templateUrl: 'dictionary.html'
})
export class DictionaryPage implements OnInit {
  databaseData;
  databaseList;
  databaseQuery;

  firestoreData;
  firestoreList;
  firestoreQuery;

  authState;
  translationArray:Translation[]=[]
  searched:Translation[]=[]
  searchedWord:string=""

  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController, public navParams: NavParams) {
               }

  ngOnInit() {

       // Realtime Database
       this.db.read('temeyola').subscribe((data) => {
           this.databaseData = data;
       });

       this.firestore.query('Translation').on().subscribe((data) => {
           this.firestoreQuery = data;
           for( let a0 of this.firestoreQuery){
             let translation=new Translation(a0.word,a0.meaning,a0.example,a0.exampleMeaning)
             this.translationArray.push(translation)
           }
       });



       // Authentication
       this.auth.isAuthenticated().subscribe((isAuth) => {
           this.authState = isAuth;
       });


   }
  searchWordDictionary(event){
    this.searchedWord=event
    console.log(this.searchedWord)
    this.searched=[]
     for (let a0 of this.translationArray){
       if (a0.word.toLowerCase().startsWith(this.searchedWord.toLowerCase())){
         this.searched.push(a0)
       }
     }
  }



}

class Translation {
  public word:string
  public meaning:string
  public example:string
  public exampleMeaning:string

  constructor(word:string,meaning:string,example:string,exampleMeaning:string){
    this.word=word
    this.meaning=meaning
    this.example=example
    this.exampleMeaning=exampleMeaning
  }

}
