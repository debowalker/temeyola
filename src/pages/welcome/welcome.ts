import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MainPage } from '../pages';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
	welcomeMessage:string
  public loggedUserState:boolean

  constructor(public navCtrl: NavController,private storage: Storage,
              public toastCtrl: ToastController) {
  }

  login() {
    this.storage.get('userName').then((val) => {
      console.log("username")
      console.log(val)
        if (val==null){
          this.navCtrl.push('LoginPage');
        }else{
          let toast = this.toastCtrl.create({
            message: 'You already logged in',
            duration: 3000
          });
          toast.present();

          this.navCtrl.push("TranslationLanguageMenuPage")
        }
        // console.log(loggedUserState)
      });
  }

  signup() {
    let loggedUserState=false
    this.storage.get('userName').then((val) => {
        if (val!=null){
          loggedUserState=true
        }
      });
    if (loggedUserState==false){
      this.navCtrl.push('SignupPage');
    }else{
      this.navCtrl.push(MainPage)
    }
  }
}
