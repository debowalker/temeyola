import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemeyolaPage } from './temeyola';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TemeyolaPage,
  ],
  imports: [
    IonicPageModule.forChild(TemeyolaPage),
    TranslateModule.forChild()
  ],
  exports: [
    TemeyolaPage
  ]
})
export class TutorialPageModule { }
