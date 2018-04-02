import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TranslatePage } from './translate';

import {AngularFireLite} from 'angularfire-lite';

@NgModule({
  declarations: [
    TranslatePage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatePage),
    TranslateModule.forChild(),
     AngularFireLite.forRoot({
      apiKey: "AIzaSyD4m39YhVN_LAcHBp_XEtN9Ff85GgT3-sU",
      authDomain: "temeyola.firebaseapp.com",
      databaseURL: "https://temeyola.firebaseio.com",
      projectId: "temeyola",
      storageBucket: "temeyola.appspot.com",
      messagingSenderId: "862335102481"
    }),
  ],
  exports: [
    TranslatePage
  ]
})
export class TranslatePageModule { }
