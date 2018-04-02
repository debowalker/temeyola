import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// import { Items } from '../mocks/providers/items';
// import { WordNetEnglishWordProvider as EnglishWordToTranslate } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';

import {AngularFireLite} from 'angularfire-lite';
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireLite.forRoot({
      apiKey: "AIzaSyD4m39YhVN_LAcHBp_XEtN9Ff85GgT3-sU",
      authDomain: "temeyola.firebaseapp.com",
      databaseURL: "https://temeyola.firebaseio.com",
      projectId: "temeyola",
      storageBucket: "temeyola.appspot.com",
      messagingSenderId: "862335102481"
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    AngularFireLite,
    // { provide: EnglishWordToTranslate, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }