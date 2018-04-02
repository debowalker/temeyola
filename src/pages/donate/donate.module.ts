import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DonatePage } from './donate';

@NgModule({
  declarations: [
    DonatePage,
  ],
  imports: [
    IonicPageModule.forChild(DonatePage),
    TranslateModule.forChild()
  ],
  exports: [
    DonatePage
  ]
})
export class DonatePageModule { }
