import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {AngularFireLiteAuth, AngularFireLiteDatabase, AngularFireLiteFirestore} from 'angularfire-lite';
import {Md5} from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage';

// import { User } from '../../providers/providers';
// import {UsersProvider} from '../../providers/providers'
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  account: { userName: string, password: string } = {
    userName: '',
    password: ''
  };
  //Account details
  detectedUser=[]
  invalidCredentialError=[]
  databaseData;
  databaseList;
  databaseQuery;

  firestoreData;
  firestoreList;
  firestoreQuery;

  authState;

  // Our translated text strings
  // private loginErrorString: string;

  constructor(public db: AngularFireLiteDatabase,
              public auth: AngularFireLiteAuth,
              public firestore: AngularFireLiteFirestore,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              private storage: Storage) {

    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // })
  }
  ngOnInit() {
       this.firestore.query('Users').on().subscribe((data) => {
           this.firestoreQuery = data;

       });



       // Authentication
       this.auth.isAuthenticated().subscribe((isAuth) => {
           this.authState = isAuth;
       });
     }

  doLogin() {
    let loggedUserState=false
    this.storage.get('userName').then((val) => {
        if (val!=null || val!=undefined){
          loggedUserState=true
        }
      });
    if (loggedUserState==false){
      this.invalidCredentialError=[]
      let hashed=Md5.hashStr(this.account.password)
      let retrievedUsers=this.firestoreQuery
      for (let a0 of retrievedUsers){
        if (a0.userName==this.account.userName && a0.password==hashed){
          this.detectedUser.push(a0.userName)
        }
      }
      if (this.detectedUser.length==1){
        this.storage.set('userName', this.account.userName);
        let date=new Date()
        this.storage.set("timeOfLogin",date)
        this.navCtrl.push("TranslationLanguageMenuPage")
      }else{
        this.invalidCredentialError=[1,2]
      }
    }else{
      this.navCtrl.push(MainPage);
    }
  }
}
