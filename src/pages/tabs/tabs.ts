import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public tab1Root: any = Tab1Root;
  public tab2Root: any = Tab2Root;
  public tab3Root: any = Tab3Root;

  public tab1Title:string;
  public tab2Title :string;
  public tab3Title:string;

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    this.tab1Title="Translate"
    this.tab2Title="Dictionary"
    this.tab3Title="Donate"
  }
}
