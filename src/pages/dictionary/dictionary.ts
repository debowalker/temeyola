import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController,NavParams,AlertController,
         MenuController,LoadingController,ToastController } from 'ionic-angular';
import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';
import { Storage } from '@ionic/storage';


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
  dictionaryLanguageMode:string=""
  languageArray
  usersArray

  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private storage: Storage,
              public menu:MenuController,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController) {
    menu.enable(true)
               }

  ngOnInit() {

       // Realtime Database
       this.db.read('temeyola').subscribe((data) => {
           this.databaseData = data;
       });

       this.firestore.query('Users').on().subscribe((data) => {
         this.usersArray=data
       })
       this.firestore.query('Language').on().subscribe((data) => {
         this.languageArray=data
       })
       this.firestore.query('Translation').on().subscribe((data) => {
         let translatedWords=data
         this.firestore.query('englishWords').on().subscribe((data1) => {
         let englishWordList=data1

           for( let a0 of translatedWords){
             for (let b0 of englishWordList){
               if (a0.wordId==b0.wordId){
                 let translation=new Translation(a0.translationId,a0.userName,a0.wordId,b0.word,a0.meaning,
                                                 a0.example,a0.exampleMeaning,a0.languageId,a0.dateOfRecord)
                 this.translationArray.push(translation)
                 break
               }
             }

           }

       });

       });



       // Authentication
       this.auth.isAuthenticated().subscribe((isAuth) => {
           this.authState = isAuth;
       });


   }
  searchWordDictionary(event){
    this.storage.get('userName').then((val) => {
        if (val!=null || val!=undefined){
                 this.storage.get('languageFrom').then((val0)=>{
                   let languageFrom=val0
                   this.storage.get('languageTo').then((val1)=>{
                     let languageTo=val1
                     if (languageFrom=="English"){
                      for (let a0 of this.languageArray){
                        if (a0.language==languageTo){
                          this.searchedWord=event
                          this.searched=[]
                           for (let b0 of this.translationArray){
                             if (b0.word.toLowerCase().startsWith(this.searchedWord.toLowerCase())&&b0.languageId==a0.languageId){
                               this.searched.push(b0)
                             }
                           }
                        }
                      }
                    }else{
                      console.log("hello")
                    }
                   })
                 })
           }else{
             let toast = this.toastCtrl.create({
                message: 'You are not signed in!!!',
                duration: 3000
              });
              toast.present();
           }
         });


  }

  changeLanguage(){
    this.storage.get('userName').then((val) => {
        if (val!=null || val!=undefined){
          let alert = this.alertCtrl.create();
          alert.setTitle('Choose The Dictionary Language');
          this.firestore.query('Language').on().subscribe((data) => {
                 let languageList = data;
                 let addedLanguage=false
                 for (let a0 of languageList){
                     let option0:Object={type:"radio",label:`English-${a0.language}`,value:`English@${a0.language}`}
                     let option1:Object={type:"radio",label:`${a0.language}-English`,value:`${a0.language}@English`}
                   alert.addInput(option0);
                   alert.addInput(option1);
                  if (addedLanguage==false){
                    alert.addButton('Cancel');
                   alert.addButton({
                   text: 'OK',
                   handler: data => {
                        let dictionaryMode=data.split("@")
                        this.storage.remove('languageFrom');
                        this.storage.remove('languageTo');
                        this.storage.set('languageFrom', dictionaryMode[0]);
                        this.storage.set('languageTo', dictionaryMode[1]);
                        this.dictionaryLanguageMode=`${dictionaryMode[0]}-${dictionaryMode[1]}`
                        let loader=this.loadingCtrl.create(
                           {
                             content:"Changing dictionary language setting",
                             duration:1000
                           }
                         )
                         loader.present()
                      }
                    });
                   alert.present()
                   addedLanguage=true
                   }

                 }

             });
           }else{
             let toast = this.toastCtrl.create({
                message: 'You are not signed in!!!',
                duration: 3000
              });
              toast.present();
           }
         });

  }

  signOut() {
    let confirm = this.alertCtrl.create({
      title: 'Sign Out?',
      message: 'Are you sure you really want to sign out?',
      buttons: [
        {
          text: 'NOT REALLY',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OFCOURSE',
          handler: () => {
            this.storage.get('userName').then((val) => {
                if (val!=null || val!=undefined){
                  this.storage.remove('userName');
                  this.storage.remove('translationLanguageId');
                  this.storage.remove('translationLanguage');
                  this.storage.remove('languageFrom');
                  this.storage.remove('languageTo');
                  let loader=this.loadingCtrl.create(
                     {
                       content:`Signing out of ${val}...`,
                       duration:1000
                     }
                   )
                   loader.present()
                  this.navCtrl.push("TemeyolaPage")
                }else{
                  let loader=this.loadingCtrl.create(
                     {
                       content:"You were not signed in...",
                       duration:1000
                     }
                   )
                   loader.present()
                   this.navCtrl.push("TemeyolaPage")
                }
              });
          }
        }
      ]
    });
    confirm.present();
  }



}

class Translation {
  public translationId:string
  public userName:string
  public wordId:number
  public word:string
  public meaning:string
  public example:string
  public exampleMeaning:string
  public languageId:number
  public dateOfRecord:string

  constructor(translationId:string,userName:string,wordId:number,word:string,meaning:string,
              example:string,exampleMeaning:string,languageId:number,dateOfRecord:string){
    this.translationId=translationId
    this.userName=userName
    this.wordId=wordId
    this.languageId=languageId
    this.dateOfRecord=dateOfRecord
    this.word=word
    this.meaning=meaning
    this.example=example
    this.exampleMeaning=exampleMeaning
  }

}
