import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DictionaryPage } from './dictionary';

@NgModule({
  declarations: [
    DictionaryPage,
  ],
  imports: [
    IonicPageModule.forChild(DictionaryPage),
    TranslateModule.forChild()
  ],
  exports: [
    DictionaryPage
  ]
})
export class DictionaryPageModule { }
