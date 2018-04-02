import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

}
// export const temeyolaConfig = {
//     apiKey: "AIzaSyD4m39YhVN_LAcHBp_XEtN9Ff85GgT3-sU",
//     authDomain: "temeyola.firebaseapp.com",
//     databaseURL: "https://temeyola.firebaseio.com",
//     projectId: "temeyola",
//     storageBucket: "temeyola.appspot.com",
//     messagingSenderId: "862335102481"
//   };