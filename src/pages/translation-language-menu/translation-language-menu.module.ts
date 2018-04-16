import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslationLanguageMenuPage } from './translation-language-menu';

@NgModule({
  declarations: [
    TranslationLanguageMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslationLanguageMenuPage),
  ],
})
export class TranslationLanguageMenuPageModule {}
