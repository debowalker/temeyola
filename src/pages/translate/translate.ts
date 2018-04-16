import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController,
         AlertController,LoadingController } from 'ionic-angular';

import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';
import { WordNetEnglishWordProvider as EnglishWordToTranslate } from '../../providers/providers';
// import {TranslatedEnglishWordProvider} from '../../providers/providers'

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'translate-master',
  templateUrl: 'translate.html'
})
export class TranslatePage implements OnInit {
  ///ngModel
  translationForm: {wordId:number,word:string, meaning: string, example: string, exampleMeaning: string } = {
    wordId:0,
    word:"abundant",
    meaning: '',
    example: '',
    exampleMeaning: ''
  };
  title:string
  databaseData;
    databaseList;
    databaseQuery;

    firestoreData;
    firestoreList;
    firestoreQuery;

    authState;
    rand
    myList
    englishWord:EnglishWordToTranslate[]=[]
    selectedEnglishword:EnglishWordToTranslate[]=[]
    addTransaltionStatusClassObject
    submitted
    document:string
    translationState:number[]

    //metadata-0
    user:string=""
    language:string=""
    languageId:number

  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public alertCtrl:AlertController,
              public loadingCtrl:LoadingController,
              private storage: Storage) {
    this.title="Translate"
    this.translationState=[]
      }
   ngOnInit() {
        this.storage.get('userName').then((val) => {
          this.user=val
          console.log(this.user)
        });

        this.storage.get('translationLanguage').then((val) => {
          this.language=val
          console.log(this.language)
        });
        this.storage.get('translationLanguageId').then((val1) => {
          this.languageId=val1
        });

        this.firestore.query('englishWords').on().subscribe((data) => {
            this.firestoreQuery = data;
            for (let i of this.firestoreQuery) {
              let englishWord=new EnglishWordToTranslate(i.wordId,
                                                        i.word,
                                                        i.pos,
                                                        i.description)
              this.englishWord.push(englishWord)
            }
            this.rand=Math.floor(Math.random() * (this.englishWord.length-1 - 0 + 1)) + 0

        });



        // Authentication
        this.auth.isAuthenticated().subscribe((isAuth) => {
            this.authState = isAuth;
        });


    }
    refresh(){
      this.translationState=[]
    this.rand=Math.floor(Math.random() * (this.englishWord.length-1 - 0 + 1)) + 0
  }
  generateDocumentId(){
    while (true) {
        let documentId0=Math.random().toString(36).substr(2)
        let documentId1=Math.random().toString(36).substr(2)
        let documentId=`${documentId0+documentId1}`
        let documentIdCheck
        this.firestore.query(`temeyola/Translation/${documentId}`).on().subscribe((data) => {
                documentIdCheck = data;
            });
        if (documentIdCheck.length==0) {
          this.document=documentId
          break

        }
    }

  }
  saveTranslation(){
    this.translationState=[1]
    this.generateDocumentId()
    let currentWord=this.englishWord[this.rand]
    let toSubmit={translatonId:this.document,
                  userName:this.user,
                  wordId:currentWord.wordId,
                  meaning:this.translationForm.meaning,
                  languageId:this.languageId,
                  example:this.translationForm.example,
                  exampleMeaning:this.translationForm.exampleMeaning,
                  dateOfRecord:new Date()
                }
    this.firestore.write("Translation/"+this.document,toSubmit).subscribe(()=>{

                                          })
    this.translationForm = {
                      wordId:this.rand,
                      word:"",
                      meaning: '',
                      example: '',
                      exampleMeaning: ''
                    };
    this.translationState=[1,2]
    this.rand=Math.floor(Math.random() * (this.englishWord.length-1 - 0 + 1)) + 0
    return false
  }

  ionViewDidLoad() {
  }

  changeLanguage(){
    let confirm = this.alertCtrl.create({
      title: 'Change translation language?',
      message: 'Are you sure you really want to translate another language?',
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
            this.navCtrl.push('TranslationLanguageMenuPage')
          }
        }
      ]
    });
    confirm.present();
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
