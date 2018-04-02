import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';
import { WordNetEnglishWordProvider as EnglishWordToTranslate } from '../../providers/providers';
import {TranslatedEnglishWordProvider} from '../../providers/providers'
@IonicPage()
@Component({
  selector: 'translate-master',
  templateUrl: 'translate.html'
})
export class TranslatePage implements OnInit {
  ///ngModel
  translationForm: {word:string, meaning: string, example: string, exampleMeaning: string } = {
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

  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,public navCtrl: NavController, public modalCtrl: ModalController) {
    this.title="Translate"
    this.translationState=[]
      }
   ngOnInit() {


        this.firestore.query('englishWords').on().subscribe((data) => {
            this.firestoreQuery = data;
            for (let i of this.firestoreQuery) {
              let englishWord=new EnglishWordToTranslate(i.word,
                                                        i.pos,
                                                        i.description)
              this.englishWord.push(englishWord)
            }
            this.rand=Math.floor(Math.random() * (this.englishWord.length-1 - 0 + 1)) + 0
            console.log(this.englishWord[this.rand])
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
    let toSubmit=new TranslatedEnglishWordProvider(this.translationForm.word,this.translationForm.meaning,
                                      this.translationForm.example,this.translationForm.exampleMeaning,
                                    this.englishWord,this.rand)
    this.firestore.write("Translation/"+this.document,toSubmit.toSubmit).subscribe(()=>{

                                          })
    this.translationForm = {
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

}
